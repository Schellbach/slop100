# 🪙 Slop 100 Bitcoin Inscriber

A Rust service that immortalizes the daily Slop 100 AI viral content leaderboard on the Bitcoin blockchain using Ordinals inscriptions.

## 🎯 Overview

This service automatically fetches the current Slop 100 leaderboard and inscribes it as immutable data on Bitcoin using the Ordinals protocol. Each day's rankings become a permanent part of Bitcoin's blockchain history.

## ⚡ Features

- **Daily Automation**: Automatically inscribes leaderboard data every 24 hours
- **Bitcoin Ordinals**: Uses the Ordinals protocol for permanent data storage
- **JSON Format**: Structured data format for easy parsing and verification
- **Metadata Tracking**: Includes timestamps, inscription IDs, and protocol version
- **Error Handling**: Robust error handling with logging and retry mechanisms
- **Configurable**: Environment-based configuration for different setups

## 🛠️ Prerequisites

1. **Rust**: Install from [rustup.rs](https://rustup.rs/)
2. **Bitcoin Core**: Running Bitcoin node with RPC enabled
3. **Ord Wallet**: Ordinals-compatible wallet for inscriptions

### Bitcoin Core Setup

```bash
# Install Bitcoin Core
# Configure bitcoin.conf:
server=1
rpcuser=bitcoin
rpcpassword=your_secure_password
rpcallowip=127.0.0.1
txindex=1
```

### Ord Installation

```bash
# Install ord (Ordinals wallet)
cargo install --git https://github.com/ordinals/ord.git ord
```

## 🚀 Quick Start

1. **Clone and Setup**
   ```bash
   cd slop-100/bitcoin-inscriber
   cp .env.example .env
   # Edit .env with your Bitcoin RPC credentials
   ```

2. **Configure Environment**
   ```bash
   # Edit .env file
   SLOP100_API_URL=https://same-bf8ljyus7gw-latest.netlify.app
   BITCOIN_RPC_URL=http://localhost:8332
   BITCOIN_RPC_USER=bitcoin
   BITCOIN_RPC_PASSWORD=your_password
   BITCOIN_WALLET_NAME=slop100
   ```

3. **Run Single Inscription**
   ```bash
   ./run.sh once
   ```

4. **Start Daily Scheduler**
   ```bash
   ./run.sh schedule
   ```

## 📊 Inscription Data Format

Each inscription contains structured JSON data:

```json
{
  "slop100": {
    "metadata": {
      "chart": "Slop 100",
      "week": "July 26, 2025",
      "description": "The week's most viral AI-generated content across all platforms",
      "timestamp": "2025-07-27T12:00:00Z",
      "total_entries": 100
    },
    "rankings": [
      {
        "position": 1,
        "title": "Infinite Wojak Generator",
        "artist": "GPT-4chan",
        "last_week": 1,
        "peak_position": 1,
        "weeks_on_chart": 23,
        "is_new": false,
        "has_gains": true,
        "is_award": true
      }
      // ... 99 more entries
    ]
  },
  "inscription_metadata": {
    "inscription_id": "uuid-v4-here",
    "created_at": "2025-07-27T12:00:00Z",
    "protocol": "slop100",
    "version": "1.0",
    "content_type": "application/json"
  }
}
```

## 🔧 Configuration Options

| Environment Variable | Description | Default |
|---------------------|-------------|---------|
| `SLOP100_API_URL` | URL to fetch leaderboard data | `https://same-bf8ljyus7gw-latest.netlify.app` |
| `BITCOIN_RPC_URL` | Bitcoin Core RPC endpoint | `http://localhost:8332` |
| `BITCOIN_RPC_USER` | Bitcoin RPC username | `bitcoin` |
| `BITCOIN_RPC_PASSWORD` | Bitcoin RPC password | `password` |
| `BITCOIN_WALLET_NAME` | Wallet name for inscriptions | `slop100` |
| `INSCRIPTION_FEE_RATE` | Fee rate in sats/vbyte | `10` |
| `RUST_LOG` | Logging level | `info` |

## 📝 Usage Examples

### Single Inscription
```bash
# Inscribe current leaderboard once
./run.sh once
```

### Daily Automation
```bash
# Start daily inscription scheduler
./run.sh schedule
```

### Manual Build and Run
```bash
# Build the project
cargo build --release

# Run with custom parameters
cargo run --release -- --mode once

# Run tests
cargo test
```

## 🔍 Viewing Inscriptions

Once inscribed, you can view the data on ordinals explorers:

- **Ordinals.com**: `https://ordinals.com/inscription/{inscription_id}`
- **Ord.io**: `https://ord.io/{inscription_id}`
- **Bitcoin Explorer**: Search by transaction ID

## 🏗️ Architecture

```
┌─────────────────┐    ┌──────────────────┐    ┌─────────────────┐
│   Slop 100      │    │   Rust Inscriber │    │   Bitcoin       │
│   Next.js App   │────│   Service        │────│   Blockchain    │
│   /api/board    │    │                  │    │   (Ordinals)    │
└─────────────────┘    └──────────────────┘    └─────────────────┘
         │                        │                        │
         │                        │                        │
    ┌────▼────┐              ┌────▼────┐              ┌────▼────┐
    │ JSON    │              │ Fetch   │              │ Immutable│
    │ API     │              │ Format  │              │ Storage │
    │ Data    │              │ Inscribe│              │         │
    └─────────┘              └─────────┘              └─────────┘
```

## 🛡️ Security Considerations

1. **Private Keys**: Never commit wallet private keys to version control
2. **RPC Security**: Use strong passwords for Bitcoin RPC
3. **Network Security**: Consider using Bitcoin Core over Tor
4. **Fee Management**: Monitor fee rates to avoid overpaying
5. **Backup**: Always backup your wallet before inscribing

## 🔧 Development

### Building from Source
```bash
git clone <repo>
cd slop-100/bitcoin-inscriber
cargo build
```

### Running Tests
```bash
cargo test
```

### Adding Features
- Extend the `LeaderboardEntry` struct for new data fields
- Modify inscription format in `prepare_inscription_data()`
- Add notification systems for successful inscriptions

## 📈 Monitoring

The service logs all activities:

```bash
# View logs
RUST_LOG=info ./run.sh schedule

# Debug mode
RUST_LOG=debug ./run.sh once
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Add tests for new functionality
4. Submit a pull request

## 📜 License

MIT License - see LICENSE file for details

## 🆘 Troubleshooting

### Common Issues

**"Failed to connect to Bitcoin RPC"**
- Check Bitcoin Core is running
- Verify RPC credentials in `.env`
- Ensure `rpcallowip` includes your IP

**"Insufficient funds"**
- Ensure wallet has Bitcoin for transaction fees
- Check fee rate settings

**"Inscription too large"**
- Current limit is ~400KB per inscription
- Consider compressing data or splitting large charts

### Getting Help

- Check the logs with `RUST_LOG=debug`
- Verify Bitcoin Core connectivity
- Test with single inscription before scheduling

## 🌟 Future Enhancements

- [ ] Multi-chart support (Slop R&B 100, Country Slop, etc.)
- [ ] Inscription compression for larger datasets
- [ ] Web dashboard for inscription history
- [ ] Integration with ordinals marketplaces
- [ ] Automated fee optimization
- [ ] Discord/Telegram notifications
- [ ] Historical chart inscriptions
