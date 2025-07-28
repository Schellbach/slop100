#!/bin/bash

# Slop 100 Bitcoin Inscriber Runner
# Usage: ./run.sh [once|schedule]

set -e

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Print banner
echo -e "${BLUE}"
echo "╔═══════════════════════════════════════╗"
echo "║          Slop 100 Inscriber           ║"
echo "║     Bitcoin Ordinals Integration      ║"
echo "╚═══════════════════════════════════════╝"
echo -e "${NC}"

# Check if .env file exists
if [ ! -f .env ]; then
    echo -e "${YELLOW}⚠️  No .env file found. Creating from template...${NC}"
    cp .env.example .env
    echo -e "${RED}Please edit .env with your Bitcoin RPC credentials!${NC}"
    exit 1
fi

# Load environment variables
source .env

# Default mode
MODE=${1:-"once"}

echo -e "${GREEN}🚀 Starting Slop 100 Bitcoin Inscriber...${NC}"
echo -e "${BLUE}📊 API URL: ${SLOP100_API_URL}${NC}"
echo -e "${BLUE}⛓️  Bitcoin RPC: ${BITCOIN_RPC_URL}${NC}"
echo -e "${BLUE}👛 Wallet: ${BITCOIN_WALLET_NAME}${NC}"
echo -e "${BLUE}🔧 Mode: ${MODE}${NC}"
echo ""

# Build the project
echo -e "${YELLOW}🔨 Building Rust project...${NC}"
cargo build --release

# Check if build succeeded
if [ $? -ne 0 ]; then
    echo -e "${RED}❌ Build failed!${NC}"
    exit 1
fi

echo -e "${GREEN}✅ Build successful!${NC}"
echo ""

# Run the inscriber
echo -e "${YELLOW}🎯 Running inscription service...${NC}"
echo ""

case $MODE in
    "once")
        echo -e "${BLUE}📝 Running single inscription...${NC}"
        cargo run --release -- --mode once
        ;;
    "schedule")
        echo -e "${BLUE}⏰ Starting scheduled inscription service...${NC}"
        echo -e "${YELLOW}Press Ctrl+C to stop the scheduler${NC}"
        cargo run --release -- --mode schedule
        ;;
    "test")
        echo -e "${BLUE}🧪 Running tests...${NC}"
        cargo test
        ;;
    *)
        echo -e "${RED}❌ Invalid mode: $MODE${NC}"
        echo -e "${YELLOW}Usage: ./run.sh [once|schedule|test]${NC}"
        exit 1
        ;;
esac

echo ""
echo -e "${GREEN}🎉 Slop 100 Inscriber completed!${NC}"
