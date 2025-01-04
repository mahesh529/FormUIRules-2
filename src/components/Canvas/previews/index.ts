import { ComponentType } from '../../../types/form';
import { TextPreview } from './input/TextPreview';
import { TextAreaPreview } from './input/TextAreaPreview';
import { NumberPreview } from './input/NumberPreview';
import { CodePreview } from './input/CodePreview';
import { MarkdownPreview } from './input/MarkdownPreview';
import { CheckboxPreview } from './select/CheckboxPreview';
import { RadioPreview } from './select/RadioPreview';
import { SliderPreview } from './select/SliderPreview';
import { VotingPreview } from './select/VotingPreview';
import { DatePreview, TimePreview } from './select/DateTimePreview';
import { ImagePreview } from './media/ImagePreview';
import { VideoPreview } from './media/VideoPreview';
import { AudioPreview } from './media/AudioPreview';
import { CSVPreview } from './media/CSVPreview';

export const ComponentPreviews: Record<ComponentType, React.FC<any>> = {
  // Input components
  text: TextPreview,
  textarea: TextAreaPreview,
  number: NumberPreview,
  paragraph: TextAreaPreview,
  markdown: MarkdownPreview,
  code: CodePreview,

  // Select components
  checkbox: CheckboxPreview,
  radio: RadioPreview,
  slider: SliderPreview,
  date: DatePreview,
  time: TimePreview,
  voting: VotingPreview,
  rating: SliderPreview,

  // Media components
  image: ImagePreview,
  video: VideoPreview,
  audio: AudioPreview,
  avatar: ImagePreview,
  media: ImagePreview,
  web: TextPreview,
  pdf: TextPreview,
  url: TextPreview,
  csv: CSVPreview
};