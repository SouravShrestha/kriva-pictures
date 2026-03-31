import clockIcon from "@/assets/icons/clock.png";
import cameraIcon from "@/assets/icons/camera.png";
import clicksIcon from "@/assets/icons/clicks.png";
import driveIcon from "@/assets/icons/drive.png";
import outfitIcon from "@/assets/icons/outfit.png";
import propsIcon from "@/assets/icons/props.png";
import peopleIcon from "@/assets/icons/people.png";
import safetyIcon from "@/assets/icons/safety.png";
import cakeIcon from "@/assets/icons/cake.png";
import portraitIcon from "@/assets/icons/portrait.png";
import pictureIcon from "@/assets/icons/picture.png";
import { StaticImageData } from "next/image";

const iconMapping: Record<string, StaticImageData> = {
  time: clockIcon,
  camera: cameraIcon,
  clicks: clicksIcon,
  images: pictureIcon,
  drive: driveIcon,
  outfit: outfitIcon,
  props: propsIcon,
  people: peopleIcon,
  safety: safetyIcon,
  cake: cakeIcon,
  portrait: portraitIcon,
};

export function getIcon(iconName: string): StaticImageData {
  return iconMapping[iconName] ?? clockIcon;
}

export function getAvailableIcons(): string[] {
  return Object.keys(iconMapping);
}
