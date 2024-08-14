export default interface Report{
path : string;
name : string;
size : string;
last_modified : string;
}

export interface ReportRequest{
    url : string;
}

export interface ReportResponse{
    message : string;
    file_name : string;
    file_url : string;
}