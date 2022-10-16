import { AxiosError } from "axios";
import { DefaultMessage, ErrorMessage } from "./message";

export type IsError = Error | AxiosError;

export interface InitProps {
  channelUrl: string;
  project: string;
}

// TODO: 별도의 tsconfig.json을 가진다면 index.d.ts에 옮길것
declare global {
  interface Window {
    TeamsWebhook: {
      name: 'Teams-webhook';
      project: string;
      type: string; // 'error' | 'default';
      channelUrl: string;
      message: ErrorMessage | DefaultMessage;
      data: Error | AxiosError | DefaultMessage;
      init: (args: InitProps) => void;
      send: (data: DefaultMessage) => void;
      error: (error: IsError) => void;
    };
  }
}

