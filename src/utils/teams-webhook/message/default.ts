export interface DefaultMessage {
  type: string;
  themeColor?: string;
  title: string;
  text: string;
}

export const defaultMessage: DefaultMessage = {
  "type":"MessageCard",
  "themeColor":"0072C6",
  "title":"Hello Teams!",
  "text":"Hell Law World"
};