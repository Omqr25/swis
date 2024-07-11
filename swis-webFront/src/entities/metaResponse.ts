import links from "./linkResponse";

export default interface meta{
    total: number;
    per_page: number;
    count: number;
    current_page: number;
    last_page: number;
    path: string;
    from: number;
    to: number;
    links: links;
}