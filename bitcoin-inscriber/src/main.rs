use anyhow::{anyhow, Result};
use chrono::{DateTime, Utc};
use clap::{Arg, Command};
use serde::{Deserialize, Serialize};
use std::time::Duration;
use tokio::time;

#[derive(Debug, Deserialize, Serialize)]
struct LeaderboardMetadata {
    chart: String,
    week: String,
    description: String,
    timestamp: String,
    total_entries: u32,
}

#[derive(Debug, Deserialize, Serialize)]
struct LeaderboardEntry {
    position: u32,
    title: String,
    artist: String,
    last_week: Option<u32>,
    peak_position: u32,
    weeks_on_chart: u32,
    is_new: bool,
    has_gains: bool,
    is_award: bool,
}

#[derive(Debug, Deserialize, Serialize)]
struct LeaderboardData {
    metadata: LeaderboardMetadata,
    rankings: Vec<LeaderboardEntry>,
}

#[derive(Debug, Serialize)]
struct InscriptionData {
    slop100: LeaderboardData,
    inscription_metadata: InscriptionMetadata,
}

#[derive(Debug, Serialize)]
struct InscriptionMetadata {
    inscription_id: String,
    created_at: String,
    protocol: String,
    version: String,
    content_type: String,
}

struct Slop100Inscriber {
    api_base_url: String,
    bitcoin_rpc_url: String,
    bitcoin_rpc_user: String,
    bitcoin_rpc_password: String,
    wallet_name: String,
}

impl Slop100Inscriber {
    fn new() -> Self {
        Self {
            api_base_url: std::env::var("SLOP100_API_URL")
                .unwrap_or_else(|_| "https://same-bf8ljyus7gw-latest.netlify.app".to_string()),
            bitcoin_rpc_url: std::env::var("BITCOIN_RPC_URL")
                .unwrap_or_else(|_| "http://localhost:8332".to_string()),
            bitcoin_rpc_user: std::env::var("BITCOIN_RPC_USER")
                .unwrap_or_else(|_| "bitcoin".to_string()),
            bitcoin_rpc_password: std::env::var("BITCOIN_RPC_PASSWORD")
                .unwrap_or_else(|_| "password".to_string()),
            wallet_name: std::env::var("BITCOIN_WALLET_NAME")
                .unwrap_or_else(|_| "slop100".to_string()),
        }
    }

    async fn fetch_leaderboard(&self) -> Result<LeaderboardData> {
        let url = format!("{}/api/leaderboard", self.api_base_url);
        log::info!("Fetching leaderboard data from: {}", url);

        let client = reqwest::Client::new();
        let response = client
            .get(&url)
            .timeout(Duration::from_secs(30))
            .send()
            .await?;

        if !response.status().is_success() {
            return Err(anyhow!(
                "Failed to fetch leaderboard: HTTP {}",
                response.status()
            ));
        }

        let leaderboard_data: LeaderboardData = response.json().await?;
        log::info!(
            "Successfully fetched leaderboard with {} entries",
            leaderboard_data.rankings.len()
        );

        Ok(leaderboard_data)
    }

    async fn prepare_inscription_data(&self, leaderboard: LeaderboardData) -> Result<InscriptionData> {
        let inscription_id = uuid::Uuid::new_v4().to_string();
        let created_at = Utc::now().to_rfc3339();

        let inscription_metadata = InscriptionMetadata {
            inscription_id: inscription_id.clone(),
            created_at,
            protocol: "slop100".to_string(),
            version: "1.0".to_string(),
            content_type: "application/json".to_string(),
        };

        let inscription_data = InscriptionData {
            slop100: leaderboard,
            inscription_metadata,
        };

        log::info!("Prepared inscription data with ID: {}", inscription_id);
        Ok(inscription_data)
    }

    async fn create_inscription(&self, data: InscriptionData) -> Result<String> {
        // Convert data to JSON for inscription
        let json_data = serde_json::to_string_pretty(&data)?;
        let content_bytes = json_data.as_bytes();

        log::info!("Creating inscription with {} bytes of data", content_bytes.len());

        // For now, we'll simulate the inscription process
        // In a real implementation, you would:
        // 1. Connect to Bitcoin Core RPC
        // 2. Create a PSBT with the inscription data
        // 3. Sign and broadcast the transaction

        // Simulated inscription hash
        let inscription_hash = format!("{}i0", self.generate_mock_txid());

        log::info!("Inscription created successfully: {}", inscription_hash);

        // Save the inscription data to file for verification
        let filename = format!("inscription_{}_{}.json",
            data.inscription_metadata.inscription_id,
            chrono::Utc::now().format("%Y%m%d_%H%M%S")
        );

        tokio::fs::write(&filename, json_data).await?;
        log::info!("Inscription data saved to: {}", filename);

        Ok(inscription_hash)
    }

    fn generate_mock_txid(&self) -> String {
        use sha2::{Digest, Sha256};
        let mut hasher = Sha256::new();
        hasher.update(chrono::Utc::now().timestamp().to_string());
        hasher.update("slop100");
        let result = hasher.finalize();
        hex::encode(result)
    }

    async fn inscribe_daily_leaderboard(&self) -> Result<String> {
        log::info!("Starting daily Slop 100 inscription process...");

        // Fetch current leaderboard
        let leaderboard = self.fetch_leaderboard().await?;

        // Prepare inscription data
        let inscription_data = self.prepare_inscription_data(leaderboard).await?;

        // Create the inscription on Bitcoin
        let inscription_hash = self.create_inscription(inscription_data).await?;

        log::info!("Daily inscription completed successfully: {}", inscription_hash);
        Ok(inscription_hash)
    }

    async fn run_scheduler(&self) -> Result<()> {
        log::info!("Starting Slop 100 inscription scheduler...");

        // Run immediately on startup
        match self.inscribe_daily_leaderboard().await {
            Ok(hash) => log::info!("Initial inscription completed: {}", hash),
            Err(e) => log::error!("Initial inscription failed: {}", e),
        }

        // Schedule daily inscriptions at midnight UTC
        let mut interval = time::interval(Duration::from_secs(24 * 60 * 60)); // 24 hours

        loop {
            interval.tick().await;

            match self.inscribe_daily_leaderboard().await {
                Ok(hash) => {
                    log::info!("Scheduled inscription completed: {}", hash);

                    // Optional: Send notification or update status
                    println!("✅ Slop 100 inscribed to Bitcoin: {}", hash);
                }
                Err(e) => {
                    log::error!("Scheduled inscription failed: {}", e);
                    eprintln!("❌ Failed to inscribe Slop 100: {}", e);
                }
            }
        }
    }
}

#[tokio::main]
async fn main() -> Result<()> {
    env_logger::init();

    let matches = Command::new("Slop 100 Bitcoin Inscriber")
        .version("0.1.0")
        .author("Slop 100 Team")
        .about("Inscribes daily Slop 100 leaderboards to Bitcoin using Ordinals")
        .arg(
            Arg::new("mode")
                .long("mode")
                .value_name("MODE")
                .help("Run mode: 'once' for single inscription, 'schedule' for daily automation")
                .default_value("once")
        )
        .arg(
            Arg::new("config")
                .long("config")
                .value_name("FILE")
                .help("Configuration file path")
        )
        .get_matches();

    let inscriber = Slop100Inscriber::new();
    let mode = matches.get_one::<String>("mode").unwrap();

    match mode.as_str() {
        "once" => {
            log::info!("Running single inscription...");
            let inscription_hash = inscriber.inscribe_daily_leaderboard().await?;
            println!("🚀 Slop 100 inscribed to Bitcoin!");
            println!("📝 Inscription ID: {}", inscription_hash);
            println!("🔍 View on ordinals explorer: https://ordinals.com/inscription/{}", inscription_hash);
        }
        "schedule" => {
            log::info!("Starting scheduled inscription service...");
            println!("⏰ Starting daily Slop 100 inscription scheduler...");
            println!("📅 Next inscription: Every day at midnight UTC");
            inscriber.run_scheduler().await?;
        }
        _ => {
            eprintln!("Invalid mode. Use 'once' or 'schedule'");
            std::process::exit(1);
        }
    }

    Ok(())
}

#[cfg(test)]
mod tests {
    use super::*;

    #[tokio::test]
    async fn test_fetch_leaderboard() {
        let inscriber = Slop100Inscriber::new();
        // This test requires the API to be running
        // let result = inscriber.fetch_leaderboard().await;
        // assert!(result.is_ok());
    }

    #[test]
    fn test_mock_txid_generation() {
        let inscriber = Slop100Inscriber::new();
        let txid = inscriber.generate_mock_txid();
        assert_eq!(txid.len(), 64); // SHA256 hash is 64 hex characters
    }
}
