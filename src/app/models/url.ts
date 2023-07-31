import { UrlInfo } from "./url-info";

export interface Url {
    id: string;
    longUrl: string;
    shortUrl: string;
    shortUrlInfo: UrlInfo
}