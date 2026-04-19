import type { IconType } from "react-icons";
import {
  BsDiscord,
  BsDribbble,
  BsFacebook,
  BsGithub,
  BsInstagram,
  BsLinkedin,
  BsMessenger,
  BsPinterest,
  BsReddit,
  BsSkype,
  BsSnapchat,
  BsSpotify,
  BsTelegram,
  BsThreads,
  BsTiktok,
  BsTwitch,
  BsTwitterX,
  BsWhatsapp,
  BsYoutube,
} from "react-icons/bs";
import {
  FaBehance,
  FaDev,
  FaGlobe,
  FaHackerrank,
  FaMedium,
  FaStackOverflow,
} from "react-icons/fa";
import {
  SiCodepen,
  SiFigma,
  SiGmail,
  SiLeetcode,
  SiNotion,
  SiSubstack,
  SiUpwork,
  SiVercel,
} from "react-icons/si";
import { MdEmail, MdPhone } from "react-icons/md";

export type ContactIconKey =
  | "github"
  | "whatsapp"
  | "linkedin"
  | "instagram"
  | "email"
  | "gmail"
  | "phone"
  | "website"
  | "twitter"
  | "facebook"
  | "youtube"
  | "telegram"
  | "discord"
  | "tiktok"
  | "figma"
  | "notion"
  | "leetcode"
  | "hackerrank"
  | "medium"
  | "devto"
  | "stackoverflow"
  | "behance"
  | "dribbble"
  | "codepen"
  | "upwork"
  | "vercel"
  | "substack"
  | "threads"
  | "reddit"
  | "pinterest"
  | "messenger"
  | "skype"
  | "snapchat"
  | "spotify"
  | "twitch";

export const CONTACT_ICON_OPTIONS: {
  label: string;
  value: ContactIconKey;
  icon: IconType;
}[] = [
  { label: "GitHub", value: "github", icon: BsGithub },
  { label: "WhatsApp", value: "whatsapp", icon: BsWhatsapp },
  { label: "LinkedIn", value: "linkedin", icon: BsLinkedin },
  { label: "Instagram", value: "instagram", icon: BsInstagram },
  { label: "Email", value: "email", icon: MdEmail },
  { label: "Gmail", value: "gmail", icon: SiGmail },
  { label: "Phone", value: "phone", icon: MdPhone },
  { label: "Website", value: "website", icon: FaGlobe },

  { label: "Twitter / X", value: "twitter", icon: BsTwitterX },
  { label: "Facebook", value: "facebook", icon: BsFacebook },
  { label: "YouTube", value: "youtube", icon: BsYoutube },
  { label: "Telegram", value: "telegram", icon: BsTelegram },
  { label: "Discord", value: "discord", icon: BsDiscord },
  { label: "TikTok", value: "tiktok", icon: BsTiktok },
  { label: "Threads", value: "threads", icon: BsThreads },
  { label: "Reddit", value: "reddit", icon: BsReddit },
  { label: "Pinterest", value: "pinterest", icon: BsPinterest },
  { label: "Messenger", value: "messenger", icon: BsMessenger },
  { label: "Skype", value: "skype", icon: BsSkype },
  { label: "Snapchat", value: "snapchat", icon: BsSnapchat },
  { label: "Spotify", value: "spotify", icon: BsSpotify },
  { label: "Twitch", value: "twitch", icon: BsTwitch },

  { label: "Figma", value: "figma", icon: SiFigma },
  { label: "Notion", value: "notion", icon: SiNotion },
  { label: "LeetCode", value: "leetcode", icon: SiLeetcode },
  { label: "HackerRank", value: "hackerrank", icon: FaHackerrank },
  { label: "Medium", value: "medium", icon: FaMedium },
  { label: "Dev.to", value: "devto", icon: FaDev },
  { label: "Stack Overflow", value: "stackoverflow", icon: FaStackOverflow },
  { label: "Behance", value: "behance", icon: FaBehance },
  { label: "Dribbble", value: "dribbble", icon: BsDribbble },
  { label: "CodePen", value: "codepen", icon: SiCodepen },
  { label: "Upwork", value: "upwork", icon: SiUpwork },
  { label: "Vercel", value: "vercel", icon: SiVercel },
  { label: "Substack", value: "substack", icon: SiSubstack },
];

export const CONTACT_ICON_MAP: Record<ContactIconKey, IconType> = {
  github: BsGithub,
  whatsapp: BsWhatsapp,
  linkedin: BsLinkedin,
  instagram: BsInstagram,
  email: MdEmail,
  gmail: SiGmail,
  phone: MdPhone,
  website: FaGlobe,

  twitter: BsTwitterX,
  facebook: BsFacebook,
  youtube: BsYoutube,
  telegram: BsTelegram,
  discord: BsDiscord,
  tiktok: BsTiktok,
  threads: BsThreads,
  reddit: BsReddit,
  pinterest: BsPinterest,
  messenger: BsMessenger,
  skype: BsSkype,
  snapchat: BsSnapchat,
  spotify: BsSpotify,
  twitch: BsTwitch,

  figma: SiFigma,
  notion: SiNotion,
  leetcode: SiLeetcode,
  hackerrank: FaHackerrank,
  medium: FaMedium,
  devto: FaDev,
  stackoverflow: FaStackOverflow,
  behance: FaBehance,
  dribbble: BsDribbble,
  codepen: SiCodepen,
  upwork: SiUpwork,
  vercel: SiVercel,
  substack: SiSubstack,
};