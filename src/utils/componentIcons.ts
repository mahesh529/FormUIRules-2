import { ComponentType } from '../types/form';
import {
  Type,
  TextSelect,
  Image,
  FileText,
  Hash,
  Code,
  AlignLeft,
  Film,
  Sliders,
  CheckSquare,
  Radio,
  ThumbsUp,
  Star,
  Clock,
  Calendar,
  Globe,
  FileImage,
  FileVideo,
  FileAudio,
  UserCircle,
  FileSpreadsheet,
} from 'lucide-react';

export const getComponentIcon = (type: ComponentType) => {
  switch (type) {
    case 'text':
      return Type;
    case 'textarea':
      return TextSelect;
    case 'markdown':
      return FileText;
    case 'number':
      return Hash;
    case 'code':
      return Code;
    case 'paragraph':
      return AlignLeft;
    case 'media':
      return Film;
    case 'slider':
      return Sliders;
    case 'checkbox':
      return CheckSquare;
    case 'radio':
      return Radio;
    case 'voting':
      return ThumbsUp;
    case 'rating':
      return Star;
    case 'time':
      return Clock;
    case 'date':
      return Calendar;
    case 'image':
      return Image;
    case 'web':
      return Globe;
    case 'pdf':
      return FileText;
    case 'url':
      return Globe;
    case 'video':
      return FileVideo;
    case 'audio':
      return FileAudio;
    case 'avatar':
      return UserCircle;
    case 'csv':
      return FileSpreadsheet;
    default:
      return Type;
  }
};