'use client'

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { ArrowUp, ArrowDown, Star, Play, Plus, Coins } from "lucide-react"
import { useEffect, useState } from 'react'

interface ChartEntry {
  position: number;
  title: string;
  artist: string;
  platform?: string;
  url?: string;
  thumbnail?: string;
  content_type?: string;
  last_week?: number;
  peak_position: number;
  weeks_on_chart: number;
  position_change?: number;
  is_new: boolean;
  has_gains: boolean;
  is_award: boolean;
  engagement_score?: number;
  ai_confidence?: number;
  viral_score?: number;
  metrics?: {
    likes: number;
    shares: number;
    comments: number;
    plays?: number;
  };
  tags?: string[];
  is_trending?: boolean;
}

interface LeaderboardData {
  metadata: {
    chart: string;
    week: string;
    description: string;
    timestamp: string;
    total_entries: number;
    data_sources?: string[];
    last_updated?: string;
  };
  rankings: ChartEntry[];
}

export default function Home() {
  const [chartData, setChartData] = useState<LeaderboardData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [userRunes, setUserRunes] = useState(2500); // Starting runes
  const [isSubmitOpen, setIsSubmitOpen] = useState(false);
  const [submitForm, setSubmitForm] = useState({
    title: '',
    artist: '',
    platform: '',
    url: '',
    category: '',
    description: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmitContent = async () => {
    if (!submitForm.title || !submitForm.artist || !submitForm.platform || !submitForm.url) {
      alert('Please fill in all required fields');
      return;
    }

    setIsSubmitting(true);

    // Simulate submission processing
    await new Promise(resolve => setTimeout(resolve, 2000));

    // Calculate runes reward based on content quality
    const baseReward = 100;
    const platformMultiplier = {
      'tiktok': 1.5,
      'youtube': 1.3,
      'twitter': 1.2,
      'spotify': 1.4,
      'instagram': 1.1,
      'web': 1.0
    }[submitForm.platform] || 1.0;

    const categoryBonus = {
      'music': 50,
      'video': 75,
      'image': 25,
      'article': 30
    }[submitForm.category] || 0;

    const runesEarned = Math.floor(baseReward * platformMultiplier + categoryBonus);

    // Award runes
    setUserRunes(prev => prev + runesEarned);

    // Reset form
    setSubmitForm({
      title: '',
      artist: '',
      platform: '',
      url: '',
      category: '',
      description: ''
    });

    setIsSubmitting(false);
    setIsSubmitOpen(false);

    // Show success message
    alert(`Content submitted successfully! You earned ${runesEarned} runes! 🪙`);
  };

  const updateSubmitForm = (field: string, value: string) => {
    setSubmitForm(prev => ({ ...prev, [field]: value }));
  };

  useEffect(() => {
    // Use hardcoded data for static export
    const staticData = {
      metadata: {
        chart: "Slop 100",
        week: new Date().toLocaleDateString('en-US', {
          month: 'long',
          day: 'numeric',
          year: 'numeric'
        }),
        description: "The week's most viral AI-generated content across all platforms, ranked by cultural virality score (CVS), engagement, and spread",
        timestamp: new Date().toISOString(),
        total_entries: 100,
        data_sources: ["Spotify", "TikTok", "YouTube", "Twitter/X", "Instagram", "Web"],
        last_updated: new Date().toISOString(),
      },
      rankings: [
        { position: 1, title: "Dust on the Wind", artist: "The Velvet Sundown", platform: "spotify", url: "https://open.spotify.com/track/68g7z6HNpIW23g1Bt8NhkI", content_type: "music", last_week: 1, peak_position: 1, weeks_on_chart: 7, position_change: 0, is_new: false, has_gains: false, is_award: true, engagement_score: 92, ai_confidence: 0.95, viral_score: 92, metrics: { likes: 641713, shares: 427142, comments: 213571, plays: 854285 }, tags: ["ai-generated", "music", "ambient", "atmospheric"], is_trending: true },
        { position: 2, title: "Drift Beyond the Flame", artist: "The Velvet Sundown", platform: "spotify", url: "https://open.spotify.com/track/1z5I5v9r6K3v0y0yq5H0", content_type: "music", last_week: 2, peak_position: 2, weeks_on_chart: 8, position_change: 0, is_new: false, has_gains: false, is_award: true, engagement_score: 89, ai_confidence: 0.94, viral_score: 57, metrics: { likes: 245345, shares: 163563, comments: 81782, plays: 327126 }, tags: ["ai-generated", "music", "ambient", "atmospheric"], is_trending: true },
        { position: 3, title: "The Wind Still Knows Our Name", artist: "The Velvet Sundown", platform: "spotify", url: "https://open.spotify.com/track/2sW2hPqK3v0y0yq5H0", content_type: "music", last_week: 3, peak_position: 3, weeks_on_chart: 11, position_change: 0, is_new: false, has_gains: false, is_award: true, engagement_score: 87, ai_confidence: 0.93, viral_score: 45, metrics: { likes: 155031, shares: 103354, comments: 51677, plays: 206708 }, tags: ["ai-generated", "music", "ambient", "atmospheric"], is_trending: true },
        { position: 4, title: "End the Pain", artist: "The Velvet Sundown", platform: "spotify", url: "https://open.spotify.com/track/3t6I5v9r6K3v1c5Z4yq5H0", content_type: "music", last_week: 4, peak_position: 4, weeks_on_chart: 10, position_change: 0, is_new: false, has_gains: false, is_award: true, engagement_score: 86, ai_confidence: 0.92, viral_score: 42, metrics: { likes: 132626, shares: 88418, comments: 44209, plays: 176835 }, tags: ["ai-generated", "music", "ambient", "atmospheric"], is_trending: true },
        { position: 5, title: "As the Silence Falls", artist: "The Velvet Sundown", platform: "spotify", url: "https://open.spotify.com/track/4u7I5v9r6K3v1c5Z4yq5H0", content_type: "music", last_week: 5, peak_position: 5, weeks_on_chart: 11, position_change: 0, is_new: false, has_gains: false, is_award: true, engagement_score: 86, ai_confidence: 0.91, viral_score: 42, metrics: { likes: 132500, shares: 88334, comments: 44167, plays: 176666 }, tags: ["ai-generated", "music", "ambient", "atmospheric"], is_trending: true },
        { position: 6, title: "Animals dancing on motorcycles", artist: "@petsdance7", platform: "tiktok", url: "https://www.tiktok.com/@petsdance7/video/7378357253595811080", content_type: "video", last_week: 6, peak_position: 6, weeks_on_chart: 2, position_change: 0, is_new: false, has_gains: false, is_award: true, engagement_score: 100, ai_confidence: 0.89, viral_score: 91, metrics: { likes: 4806680, shares: 3605009, comments: 2403340, plays: 1201670 }, tags: ["viral-video", "ai-content", "animals", "social-media"], is_trending: true },
        { position: 7, title: "Grandma collapsing glass bridge", artist: "YouTube Shorts", platform: "youtube", url: "https://www.youtube.com/shorts/OUSSBG143r8", content_type: "video", last_week: 5, peak_position: 5, weeks_on_chart: 4, position_change: -2, is_new: false, has_gains: false, is_award: true, engagement_score: 100, ai_confidence: 0.87, viral_score: 100, metrics: { likes: 40000000, shares: 30000000, comments: 20000000, plays: 10000000 }, tags: ["viral-video", "ai-content", "youtube-content"], is_trending: true },
        { position: 8, title: "Hailuo viral videos", artist: "Hailuo AI", platform: "web", url: "https://hailuoai.video/", content_type: "video", last_week: 9, peak_position: 8, weeks_on_chart: 6, position_change: 1, is_new: false, has_gains: true, is_award: true, engagement_score: 98, ai_confidence: 0.95, viral_score: 57, metrics: { likes: 3200000, shares: 2400000, comments: 1600000, plays: 800000 }, tags: ["viral-video", "ai-content", "trending"], is_trending: true },
        { position: 9, title: "Dance video generator", artist: "Veed.io", platform: "web", url: "https://www.veed.io/tools/image-to-video-ai/ai-dance", content_type: "video", last_week: undefined, peak_position: 9, weeks_on_chart: 1, position_change: 0, is_new: true, has_gains: false, is_award: true, engagement_score: 100, ai_confidence: 0.98, viral_score: 64, metrics: { likes: 4000000, shares: 3000000, comments: 2000000, plays: 1000000 }, tags: ["viral-video", "ai-content", "dance"], is_trending: true },
        { position: 10, title: "Google Veo 3 videos", artist: "Google DeepMind", platform: "web", url: "https://deepmind.google/models/veo/", content_type: "video", last_week: 12, peak_position: 10, weeks_on_chart: 2, position_change: 2, is_new: false, has_gains: true, is_award: true, engagement_score: 100, ai_confidence: 0.99, viral_score: 83, metrics: { likes: 4000000, shares: 3000000, comments: 2000000, plays: 1000000 }, tags: ["viral-video", "ai-content"], is_trending: true },
        { position: 11, title: "AI Girlfriend Simulator", artist: "Replika AI", platform: "web", url: "https://replika.ai/", content_type: "article", last_week: 11, peak_position: 9, weeks_on_chart: 5, position_change: 0, is_new: false, has_gains: false, is_award: false, engagement_score: 85, ai_confidence: 0.92, viral_score: 38, metrics: { likes: 890000, shares: 445000, comments: 267000, plays: 178000 }, tags: ["ai-chat", "virtual-companion", "trending"], is_trending: true },
        { position: 12, title: "Infinite Wojak Generator", artist: "@aiartist", platform: "twitter", url: "https://twitter.com/aiartist/status/123456789", content_type: "image", last_week: 13, peak_position: 11, weeks_on_chart: 3, position_change: 1, is_new: false, has_gains: true, is_award: false, engagement_score: 78, ai_confidence: 0.88, viral_score: 32, metrics: { likes: 567000, shares: 283500, comments: 142000, plays: 0 }, tags: ["meme", "ai-art", "viral-image"], is_trending: true },
        { position: 13, title: "ChatGPT Jailbreak Prompts", artist: "r/ChatGPT", platform: "web", url: "https://reddit.com/r/ChatGPT", content_type: "article", last_week: 10, peak_position: 8, weeks_on_chart: 6, position_change: -3, is_new: false, has_gains: false, is_award: false, engagement_score: 92, ai_confidence: 0.95, viral_score: 45, metrics: { likes: 1200000, shares: 800000, comments: 600000, plays: 0 }, tags: ["chatgpt", "prompt-engineering", "viral-content"], is_trending: true },
        { position: 14, title: "AI Voice Clone Prank", artist: "@prankmaster", platform: "tiktok", url: "https://www.tiktok.com/@prankmaster/video/7378357253595811081", content_type: "video", last_week: 16, peak_position: 14, weeks_on_chart: 2, position_change: 2, is_new: false, has_gains: true, is_award: false, engagement_score: 88, ai_confidence: 0.84, viral_score: 56, metrics: { likes: 2300000, shares: 1150000, comments: 575000, plays: 460000 }, tags: ["voice-clone", "prank", "ai-voice"], is_trending: true },
        { position: 15, title: "Deepfake Celebrity Singing", artist: "DeepFake Studios", platform: "youtube", url: "https://www.youtube.com/watch?v=deepfake123", content_type: "video", last_week: 14, peak_position: 12, weeks_on_chart: 4, position_change: -1, is_new: false, has_gains: false, is_award: false, engagement_score: 75, ai_confidence: 0.91, viral_score: 28, metrics: { likes: 1800000, shares: 900000, comments: 450000, plays: 360000 }, tags: ["deepfake", "celebrity", "music-video"], is_trending: false },
        { position: 16, title: "AI Art Theft Controversy", artist: "Digital Artists United", platform: "twitter", url: "https://twitter.com/digitalartists/status/123456790", content_type: "article", last_week: 15, peak_position: 13, weeks_on_chart: 3, position_change: -1, is_new: false, has_gains: false, is_award: false, engagement_score: 82, ai_confidence: 0.89, viral_score: 35, metrics: { likes: 750000, shares: 375000, comments: 562500, plays: 0 }, tags: ["ai-ethics", "art-theft", "controversy"], is_trending: false },
        { position: 17, title: "Robot Dog Dance Video", artist: "Boston Dynamics", platform: "youtube", url: "https://www.youtube.com/watch?v=robotdog123", content_type: "video", last_week: 18, peak_position: 15, weeks_on_chart: 5, position_change: 1, is_new: false, has_gains: true, is_award: false, engagement_score: 73, ai_confidence: 0.76, viral_score: 22, metrics: { likes: 1500000, shares: 750000, comments: 375000, plays: 300000 }, tags: ["robotics", "dance", "tech-demo"], is_trending: false },
        { position: 18, title: "AI Pizza Recipe Generator", artist: "FoodieAI", platform: "web", url: "https://foodieai.com/pizza", content_type: "article", last_week: 19, peak_position: 16, weeks_on_chart: 2, position_change: 1, is_new: false, has_gains: true, is_award: false, engagement_score: 68, ai_confidence: 0.83, viral_score: 19, metrics: { likes: 420000, shares: 210000, comments: 105000, plays: 0 }, tags: ["food", "recipe", "ai-generated"], is_trending: false },
        { position: 19, title: "Synthetic News Anchor", artist: "AI News Network", platform: "youtube", url: "https://www.youtube.com/watch?v=ainews123", content_type: "video", last_week: 17, peak_position: 14, weeks_on_chart: 6, position_change: -2, is_new: false, has_gains: false, is_award: false, engagement_score: 71, ai_confidence: 0.94, viral_score: 25, metrics: { likes: 980000, shares: 490000, comments: 245000, plays: 196000 }, tags: ["synthetic-media", "news", "ai-anchor"], is_trending: false },
        { position: 20, title: "AI Minecraft World Generator", artist: "MinecraftAI", platform: "web", url: "https://minecraftai.com/world-gen", content_type: "video", last_week: 22, peak_position: 18, weeks_on_chart: 3, position_change: 2, is_new: false, has_gains: true, is_award: false, engagement_score: 65, ai_confidence: 0.87, viral_score: 17, metrics: { likes: 380000, shares: 190000, comments: 95000, plays: 76000 }, tags: ["gaming", "minecraft", "world-generation"], is_trending: false },
        { position: 21, title: "AI Fashion Model Generator", artist: "StyleGAN Fashion", platform: "instagram", url: "https://instagram.com/styleganfashion", content_type: "image", last_week: 20, peak_position: 17, weeks_on_chart: 4, position_change: -1, is_new: false, has_gains: false, is_award: false, engagement_score: 62, ai_confidence: 0.91, viral_score: 15, metrics: { likes: 340000, shares: 170000, comments: 85000, plays: 0 }, tags: ["fashion", "ai-model", "synthetic-person"], is_trending: false },
        { position: 22, title: "Automated Meme Factory", artist: "MemeBot3000", platform: "twitter", url: "https://twitter.com/memebot3000/status/123456791", content_type: "image", last_week: 21, peak_position: 19, weeks_on_chart: 2, position_change: -1, is_new: false, has_gains: false, is_award: false, engagement_score: 59, ai_confidence: 0.82, viral_score: 13, metrics: { likes: 290000, shares: 145000, comments: 72500, plays: 0 }, tags: ["memes", "automation", "humor"], is_trending: false },
        { position: 23, title: "AI Stock Trading Bot Results", artist: "WallStreetAI", platform: "web", url: "https://wallstreetai.com/results", content_type: "article", last_week: 24, peak_position: 20, weeks_on_chart: 5, position_change: 1, is_new: false, has_gains: true, is_award: false, engagement_score: 57, ai_confidence: 0.88, viral_score: 12, metrics: { likes: 260000, shares: 130000, comments: 195000, plays: 0 }, tags: ["finance", "trading", "ai-bot"], is_trending: false },
        { position: 24, title: "Virtual Influencer Drama", artist: "LilMiquela", platform: "instagram", url: "https://instagram.com/lilmiquela", content_type: "article", last_week: 23, peak_position: 21, weeks_on_chart: 7, position_change: -1, is_new: false, has_gains: false, is_award: false, engagement_score: 54, ai_confidence: 0.79, viral_score: 11, metrics: { likes: 240000, shares: 120000, comments: 180000, plays: 0 }, tags: ["virtual-influencer", "drama", "social-media"], is_trending: false },
        { position: 25, title: "AI Dating Profile Optimizer", artist: "LoveAI", platform: "web", url: "https://loveai.com/optimizer", content_type: "article", last_week: 26, peak_position: 22, weeks_on_chart: 3, position_change: 1, is_new: false, has_gains: true, is_award: false, engagement_score: 52, ai_confidence: 0.85, viral_score: 10, metrics: { likes: 220000, shares: 110000, comments: 55000, plays: 0 }, tags: ["dating", "optimization", "ai-assistant"], is_trending: false }
      ]
    };

    setChartData(staticData);
    setLoading(false);
  }, []);

  const getPlatformIcon = (platform?: string) => {
    switch (platform) {
      case 'spotify': return '🎵';
      case 'twitter': return '🐦';
      case 'youtube': return '📺';
      case 'tiktok': return '📱';
      case 'instagram': return '📸';
      case 'facebook': return '👥';
      default: return '🤖';
    }
  };

  const formatMetrics = (metrics?: ChartEntry['metrics']) => {
    if (!metrics) return '';

    const { likes, shares, comments, plays } = metrics;
    const total = likes + shares + comments + (plays || 0);

    if (total > 1000000) return `${(total / 1000000).toFixed(1)}M`;
    if (total > 1000) return `${(total / 1000).toFixed(1)}K`;
    return total.toString();
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <div className="text-center">
          <div className="text-6xl mb-4">🎯</div>
          <div className="text-2xl font-bold mb-2">Loading Slop 100</div>
          <div className="text-gray-400">Aggregating AI viral content...</div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <div className="text-center">
          <div className="text-6xl mb-4">❌</div>
          <div className="text-2xl font-bold mb-2">Error Loading Data</div>
          <div className="text-gray-400">{error}</div>
        </div>
      </div>
    );
  }

  if (!chartData) {
    return null;
  }

  const { metadata, rankings } = chartData;
  const featuredEntry = rankings[0];

  return (
    <div className="min-h-screen bg-black text-white">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Page Title */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-5xl md:text-7xl font-bold">Slop 100</h1>
            <div className="flex items-center space-x-4">
              {/* Runes Display */}
              <div className="flex items-center space-x-2 bg-yellow-500/20 border border-yellow-500/30 rounded-lg px-4 py-2">
                <Coins className="w-5 h-5 text-yellow-400" />
                <span className="text-yellow-400 font-semibold">{userRunes.toLocaleString()}</span>
              </div>

              {/* Submit Content Button */}
              <Dialog open={isSubmitOpen} onOpenChange={setIsSubmitOpen}>
                <DialogTrigger asChild>
                  <Button
                    variant="outline"
                    className="bg-blue-600 border-blue-500 text-white hover:bg-blue-700"
                  >
                    <Plus className="w-4 h-4 mr-2" />
              Submit New Content
                  </Button>
                </DialogTrigger>
                <DialogContent className="bg-gray-900 border-gray-700 text-white">
                  <DialogHeader>
                    <DialogTitle className="flex items-center space-x-2">
                      <Plus className="w-5 h-5" />
                      <span>Submit Viral AI Content</span>
                      <div className="flex items-center space-x-1 text-yellow-400">
                        <Coins className="w-4 h-4" />
                        <span className="text-sm">Earn 100-225 runes</span>
                      </div>
                    </DialogTitle>
                  </DialogHeader>

                  <div className="space-y-4 pt-4">
                    {/* Title */}
                    <div className="space-y-2">
                      <Label htmlFor="title">Content Title *</Label>
                      <Input
                        id="title"
                        value={submitForm.title}
                        onChange={(e) => updateSubmitForm('title', e.target.value)}
                        placeholder="e.g., Infinite Wojak Generator"
                        className="bg-gray-800 border-gray-600"
                      />
                    </div>

                    {/* Artist/Creator */}
                    <div className="space-y-2">
                      <Label htmlFor="artist">Artist/Creator *</Label>
                      <Input
                        id="artist"
                        value={submitForm.artist}
                        onChange={(e) => updateSubmitForm('artist', e.target.value)}
                        placeholder="e.g., @username or Artist Name"
                        className="bg-gray-800 border-gray-600"
                      />
                    </div>

                    {/* Platform */}
                    <div className="space-y-2">
                      <Label htmlFor="platform">Platform *</Label>
                      <Select value={submitForm.platform} onValueChange={(value) => updateSubmitForm('platform', value)}>
                        <SelectTrigger className="bg-gray-800 border-gray-600">
                          <SelectValue placeholder="Select platform" />
                        </SelectTrigger>
                        <SelectContent className="bg-gray-800 border-gray-600">
                          <SelectItem value="tiktok">TikTok (+50% runes)</SelectItem>
                          <SelectItem value="spotify">Spotify (+40% runes)</SelectItem>
                          <SelectItem value="youtube">YouTube (+30% runes)</SelectItem>
                          <SelectItem value="twitter">Twitter/X (+20% runes)</SelectItem>
                          <SelectItem value="instagram">Instagram (+10% runes)</SelectItem>
                          <SelectItem value="web">Web/Other</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    {/* Category */}
                    <div className="space-y-2">
                      <Label htmlFor="category">Category</Label>
                      <Select value={submitForm.category} onValueChange={(value) => updateSubmitForm('category', value)}>
                        <SelectTrigger className="bg-gray-800 border-gray-600">
                          <SelectValue placeholder="Select category" />
                        </SelectTrigger>
                        <SelectContent className="bg-gray-800 border-gray-600">
                          <SelectItem value="video">Video (+75 runes)</SelectItem>
                          <SelectItem value="music">Music (+50 runes)</SelectItem>
                          <SelectItem value="article">Article (+30 runes)</SelectItem>
                          <SelectItem value="image">Image (+25 runes)</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    {/* URL */}
                    <div className="space-y-2">
                      <Label htmlFor="url">Content URL *</Label>
                      <Input
                        id="url"
                        type="url"
                        value={submitForm.url}
                        onChange={(e) => updateSubmitForm('url', e.target.value)}
                        placeholder="https://..."
                        className="bg-gray-800 border-gray-600"
                      />
                    </div>

                    {/* Description */}
                    <div className="space-y-2">
                      <Label htmlFor="description">Description (Optional)</Label>
                      <Textarea
                        id="description"
                        value={submitForm.description}
                        onChange={(e) => updateSubmitForm('description', e.target.value)}
                        placeholder="Why is this content viral? What makes it special?"
                        className="bg-gray-800 border-gray-600"
                        rows={3}
                      />
                    </div>

                    {/* Submit Button */}
                    <div className="flex space-x-3 pt-4">
                      <Button
                        onClick={handleSubmitContent}
                        disabled={isSubmitting}
                        className="flex-1 bg-blue-600 hover:bg-blue-700"
                      >
                        {isSubmitting ? (
                          <div className="flex items-center space-x-2">
                            <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                            <span>Submitting...</span>
                          </div>
                        ) : (
                          <div className="flex items-center space-x-2">
                            <Plus className="w-4 h-4" />
                            <span>Submit & Earn Runes</span>
                          </div>
                        )}
                      </Button>
                      <Button
                        variant="outline"
                        onClick={() => setIsSubmitOpen(false)}
                        disabled={isSubmitting}
                      >
                        Cancel
                      </Button>
                    </div>
                  </div>
                </DialogContent>
              </Dialog>

              {/* Connect Wallet Button */}
              <Button
                asChild
                variant="outline"
                className="bg-orange-600 border-orange-500 text-white hover:bg-orange-700"
              >
                <a
                  href="https://starkgate.starknet.io/bitcoin/bridge?mode=deposit"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center"
                >
                  <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                  </svg>
                  Connect Wallet
                </a>
              </Button>
            </div>
          </div>
        </div>

        {/* Featured #1 Track */}
        {featuredEntry && (
          <Card className="bg-gray-900 border-gray-800 mb-8 p-6">
            <div className="flex items-center space-x-6">
              <div className="text-8xl font-bold text-gray-500">1</div>
              <div className="w-24 h-24 rounded-lg bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-4xl">
                {getPlatformIcon(featuredEntry.platform)}
              </div>
              <div className="flex-1">
                <h2 className="text-3xl font-bold mb-2 text-white">{featuredEntry.title}</h2>
                <p className="text-xl text-gray-400 mb-4">{featuredEntry.artist}</p>
                <div className="flex space-x-8 text-sm">
                  <div className="text-center">
                    <div className="text-gray-400">LAST WEEK</div>
                    <div className="text-2xl font-bold text-[#ffffff]">{featuredEntry.last_week || '-'}</div>
                  </div>
                  <div className="text-center">
                    <div className="text-gray-400">WEEKS AT NO.1</div>
                    <div className="text-2xl font-bold text-[#FFFFFF]">
                      {featuredEntry.last_week === 1 ? '2+' : '1'}
                    </div>
                  </div>
                  <div className="text-center">
                    <div className="text-gray-400">WEEKS ON CHART</div>
                    <div className="text-2xl font-bold text-[#FFFFFF]">{featuredEntry.weeks_on_chart}</div>
                  </div>
                  {featuredEntry.engagement_score && (
                    <div className="text-center">
                      <div className="text-gray-400">VIRAL SCORE</div>
                      <div className="text-2xl font-bold text-[#FFFFFF]">{Math.round(featuredEntry.viral_score || 0)}</div>
                    </div>
                  )}
                </div>
                {featuredEntry.url && (
                  <div className="mt-4">
                    <Button asChild variant="outline" size="sm">
                      <a href={featuredEntry.url} target="_blank" rel="noopener noreferrer">
                        View on {featuredEntry.platform} ↗
                      </a>
                    </Button>
                  </div>
                )}
              </div>
            </div>
          </Card>
        )}

        {/* Chart Header */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-2">
            <h2 className="text-2xl font-bold">Slop 100</h2>
            <div className="text-sm text-gray-400">
              Positions <span className="text-white font-semibold">1-25</span> • <span className="text-blue-400">{metadata.total_entries} total</span>
            </div>
          </div>
          <p className="text-gray-400 text-sm mb-4">
            {metadata.week.toUpperCase()}
          </p>
          <p className="text-gray-400 text-sm">
            {metadata.description}
          </p>
          {metadata.last_updated && (
            <p className="text-gray-500 text-xs mt-2">
              Last updated: {new Date(metadata.last_updated).toLocaleString()}
            </p>
          )}
        </div>

        {/* Chart Table Header */}
        <div className="bg-blue-600 text-white p-4 mb-4 rounded-t">
          <div className="grid grid-cols-12 gap-4 text-sm font-semibold">
            <div className="col-span-1">THIS WEEK</div>
            <div className="col-span-1">AWARD</div>
            <div className="col-span-5">CONTENT</div>
            <div className="col-span-1">LAST WEEK</div>
            <div className="col-span-1">PEAK POS</div>
            <div className="col-span-1">WKS ON CHART</div>
            <div className="col-span-2"></div>
          </div>
        </div>

        {/* Chart Entries */}
        <div className="space-y-0">
          {rankings.map((entry, index) => (
            <div
              key={`${entry.position}-${entry.title}`}
              className={`grid grid-cols-12 gap-4 p-4 border-b border-gray-800 hover:bg-gray-900 transition-colors ${
                index % 2 === 0 ? 'bg-gray-950' : 'bg-black'
              }`}
            >
              {/* Position */}
              <div className="col-span-1 flex items-center">
                <span className="text-2xl font-bold">{entry.position}</span>
              </div>

              {/* Awards */}
              <div className="col-span-1 flex items-center space-x-1">
                {entry.is_award && <Star className="w-4 h-4 text-yellow-500 fill-current" />}
                {entry.has_gains && entry.last_week && entry.last_week > entry.position && (
                  <ArrowUp className="w-4 h-4 text-green-500" />
                )}
                {!entry.has_gains && entry.last_week && entry.last_week < entry.position && (
                  <ArrowDown className="w-4 h-4 text-red-500" />
                )}
              </div>

              {/* Content Info */}
              <div className="col-span-5 flex items-center space-x-4">
                <div className="w-12 h-12 rounded bg-gradient-to-br from-gray-600 to-gray-800 flex items-center justify-center text-lg">
                  {getPlatformIcon(entry.platform)}
                </div>
                <div className="flex-1">
                  <div className="flex items-center space-x-2">
                    {entry.is_new && (
                      <Badge className="bg-yellow-500 text-black text-xs">NEW</Badge>
                    )}
                    {entry.is_trending && (
                      <Badge className="bg-red-500 text-white text-xs">🔥</Badge>
                    )}
                    <h3 className="font-semibold hover:text-blue-400 cursor-pointer">
                      {entry.title}
                    </h3>
                  </div>
                  <div className="flex items-center space-x-2">
                    <p className="text-gray-400 text-sm">{entry.artist}</p>
                    {entry.metrics && (
                      <span className="text-xs text-gray-500">
                        {formatMetrics(entry.metrics)} engagements
                      </span>
                    )}
                  </div>
                  {entry.tags && entry.tags.length > 0 && (
                    <div className="flex space-x-1 mt-1">
                      {entry.tags.slice(0, 3).map(tag => (
                        <span key={tag} className="text-xs bg-gray-700 text-gray-300 px-1 rounded">
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              {/* Stats */}
              <div className="col-span-1 flex items-center justify-center text-sm">
                {entry.last_week || '-'}
              </div>
              <div className="col-span-1 flex items-center justify-center text-sm">
                {entry.peak_position}
              </div>
              <div className="col-span-1 flex items-center justify-center text-sm">
                {entry.weeks_on_chart}
              </div>

              {/* Actions */}
              <div className="col-span-2 flex items-center space-x-2">
                {entry.url ? (
                  <Button asChild size="sm" className="bg-green-600 hover:bg-green-700 text-white border-0 text-xs">
                    <a href={entry.url} target="_blank" rel="noopener noreferrer">
                      
                      <Play className="w-4 h-4 fill-current" />
                    </a>
                  </Button>
                ) : (
                  <Button size="sm" variant="outline" className="text-xs opacity-50" disabled>
                    <Play className="w-4 h-4" />
                    
                  </Button>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Load More / Continuation UI */}
        <div className="mt-8 border-t border-gray-800 pt-8">
          <div className="text-center space-y-4">
            <div className="text-gray-400 text-sm">
              <span className="text-white font-semibold">Showing positions 1-25</span> of <span className="text-blue-400 font-semibold">{metadata.total_entries}</span> total entries
            </div>

            <div className="flex items-center justify-center space-x-4">
              <Button
                variant="outline"
                className="bg-blue-600 border-blue-500 text-white hover:bg-blue-700"
                disabled
              >
                <span className="mr-2">📊</span>
                Load Next 25 Entries
              </Button>

              <Button
                variant="outline"
                className="bg-gray-700 border-gray-600 text-white hover:bg-gray-600"
                disabled
              >
                <span className="mr-2">📈</span>
                View Full Chart (1-{metadata.total_entries})
              </Button>
            </div>

            <div className="flex items-center justify-center space-x-2 text-xs text-gray-500">
              <span>●</span>
              <span>●</span>
              <span>●</span>
              <span className="text-blue-400">●</span>
              <span>●</span>
              <span>●</span>
              <span>●</span>
            </div>

            <div className="text-xs text-gray-500">
              Coming soon: Complete 1-{metadata.total_entries} rankings, historical tracking, and advanced filtering
            </div>
          </div>
        </div>

        {/* Footer Info */}
        <div className="mt-8 text-center text-gray-400 text-sm">
          <p className="mt-2">
            Powered by advanced AI engagement metrics and cultural impact analysis
          </p>
          {metadata.data_sources && (
            <p className="mt-2">
              Data sources: {metadata.data_sources.join(', ')}
            </p>
          )}
        </div>
      </div>
    </div>
  )
}
