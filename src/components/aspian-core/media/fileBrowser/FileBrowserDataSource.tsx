import React from "react";
import {IFileBrowserAntdTable} from "./types";
import {GetFileTypeIcon} from "../utils/GetFileTypeIcon";
import {IFileBrowser} from "../../../../app/models/aspian-core/attachment";

const FileBrowserDataSource = (
    fileBrowserDataSource: IFileBrowser[],
    photoFileBrowserDataSource: IFileBrowser[],
    videoFileBrowserDataSource: IFileBrowser[],
    miscellaneousFileBrowserDataSource: IFileBrowser[],
    isFileBrowserActive: boolean,
    isMiscellaneousFileBrowserActive: boolean,
    isPhotoFileBrowserActive: boolean,
    isVideoFileBrowserActive: boolean
) => {


    let data: IFileBrowserAntdTable[] = [];
    if (isFileBrowserActive) {
        fileBrowserDataSource.forEach((file, i) => {
            // Initializing columns data
            data.push({
                key: file.id,
                type: GetFileTypeIcon(file.type),
                publicFileName: file.publicFileName,
                fileName: file.fileName
            });
        });
    } else if (isPhotoFileBrowserActive) {
        photoFileBrowserDataSource.forEach((file, i) => {
            // Initializing columns data
            data.push({
                key: file.id,
                type: GetFileTypeIcon(file.type),
                publicFileName: file.publicFileName,
                fileName: file.fileName
            });
        });
    } else if (isVideoFileBrowserActive) {
        videoFileBrowserDataSource.forEach((file, i) => {
            // Initializing columns data
            data.push({
                key: file.id,
                type: GetFileTypeIcon(file.type),
                publicFileName: file.publicFileName,
                fileName: file.fileName
            });
        });
    } else if (isMiscellaneousFileBrowserActive) {
        miscellaneousFileBrowserDataSource.forEach((file, i) => {
            // Initializing columns data
            data.push({
                key: file.id,
                type: GetFileTypeIcon(file.type),
                publicFileName: file.publicFileName,
                fileName: file.fileName
            });
        });
    }


    return (data);
}

export default FileBrowserDataSource;