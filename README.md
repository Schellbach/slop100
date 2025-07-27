S# Slop 100: Decentralized AI Art Leaderboard on Bitcoin

[![Bitcoin](https://img.shields.io/badge/Bitcoin-Metaprotocols-orange.svg)](https://bitcoin.org) [![Ordinals](https://img.shields.io/badge/Ordinals-Inscriptions-blue.svg)](https://ordinals.com) [![Runes](https://img.shields.io/badge/Runes-Tokens-green.svg)](https://runesprotocol.com) [![Hackathon](https://img.shields.io/badge/Hackathon-Project-red.svg)](https://your-hackathon-link.com)

[Live Demo](https://same-bf8ljyus7gw-latest.netlify.app/)


## Overview

The Slop 100 is inspired by the Billboard Top 100, reimagined as a daily leaderboard for AI-generated slop. Built using Bitcoin metaprotocols, it uses Runes for token-based curation via a Token-Curated Registry (TCR). Community holders stake tokens to propose, challenge, and vote on entries, ensuring high-quality, viral AI art rises to the top. The leaderboard is inscribed daily on Bitcoin, creating a permanent, decentralized snapshot.

This project was developed for Plebfi: Metaprotocols.

## Features

- **Virality Ranking**: A composite algorithm scores art based on engagement, velocity, spread, and quality—blended with community curation.
- **Token-Curated Registry (TCR)**: Use SLOP runes for decentralized curation:
  - Stake to propose AI art for the leaderboard.
  - Challenge low-quality entries to trigger votes.
  - Vote with tokens; winners rewarded, losers slashed.
  - Graded design for dynamic rankings.
- **Daily Automation**: Inscribe the top 100 leaderboard as JSON on Bitcoin.

## How It Works

**TCR Curation**:
   - **Propose**: Stake SLOP and inscribe a proposal linked to your submission.
   - **Challenge**: Stake against dubious entries; starts a 24-hour vote window.
   - **Vote**: Transfer SLOP to yes/no addresses.
   - **Rewards**: Winning stakes returned + bonuses; losers redistributed/burned.

     This system allows for decentralized rankings, with minimum deposits to prevent spam.

**Leaderboard Compilation**:
   - Aggregate votes and virality scores.
   - Inscribe daily JSON snapshot.

**Virality Algorithm**:
   - Composite Virality Score (CVS) = Weighted sum of Engagement, Velocity, Spread, and Quality.
   - High shares boost velocity
   - The crowd analyzes originality

Architecture Diagram:

```
User -> AI Gen (Stable Diffusion + BTC Seed) -> TCR Proposal (Stake SLOP via Runes)
Community -> Challenge/Vote (SLOP Transfers)
Daily Script -> Tally Votes -> Inscribe Leaderboard Ordinal
App/UI -> Display Top 100 (Fetch from Explorers)
```

## Tech Stack (Proposed)

- **Bitcoin Integration**: OrdinalsBot API (testnet), bitcoinlib for tx handling.
- **Tokens**: Runes protocol for SLOP (fungible tokens on Bitcoin).
- **Data Fetching**: Mempool.space API for block data and tx scans.
- **Frontend **: React for leaderboard viewer.

## Future Ideas

- Mainnet launch with full SLOP4slop economy.
- Frontend dashboard for proposals/voting.
- Integrate more metaprotocols (e.g., BRC-20 fallback).
- ML enhancements for virality prediction.

## Contributing

Pull requests welcome! Focus on Bitcoin compatibility and TCR security.

## Credits

- Inspired by Ordinals, Runes, and TCR designs 
- Built with help from Grok (xAI) and Claude 4 Sonnet

## License

MIT License. See [LICENSE](LICENSE) for details.

---


