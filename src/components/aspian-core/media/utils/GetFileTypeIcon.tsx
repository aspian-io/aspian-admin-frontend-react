import {AttachmentTypeEnum} from "../../../../app/models/aspian-core/attachment";
import {
    FilePdfTwoTone,
    FileTextTwoTone, FileTwoTone, FileUnknownTwoTone,
    FileZipTwoTone,
    PictureTwoTone,
    PlaySquareTwoTone,
    SoundTwoTone
} from "@ant-design/icons";
import React from "react";

export const GetFileTypeIcon = (fileType: AttachmentTypeEnum): JSX.Element => {
    switch (fileType) {
        case AttachmentTypeEnum.Video:
            return <PlaySquareTwoTone style={{fontSize: 24}} />;
        case AttachmentTypeEnum.Photo:
            return <PictureTwoTone style={{fontSize: 24}} />;
        case AttachmentTypeEnum.Audio:
            return <SoundTwoTone style={{fontSize: 24}} />;
        case AttachmentTypeEnum.Compressed:
            return <FileZipTwoTone style={{fontSize: 24}} />;
        case AttachmentTypeEnum.TextFile:
            return <FileTextTwoTone style={{fontSize: 24}} />;
        case AttachmentTypeEnum.PDF:
            return <FilePdfTwoTone style={{fontSize: 24}} />;
        case AttachmentTypeEnum.Other:
            return <FileTwoTone style={{fontSize: 24}} />;
        default:
            return <FileUnknownTwoTone style={{fontSize: 24}} />;
    }
}