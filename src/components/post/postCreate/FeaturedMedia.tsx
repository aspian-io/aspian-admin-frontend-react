import React, {FC, Fragment, useEffect} from "react";
import {Card, List, Popconfirm, Select, Tooltip} from "antd";
import {
    FileBrowserCallerTypeEnum,
    FileBrowserModalTypeEnum,
    IFileBrowserAntdTable
} from "../../media/fileBrowser/types";
import {CloseOutlined, FileAddOutlined, QuestionCircleOutlined, VideoCameraAddOutlined} from "@ant-design/icons";
import {
    fileBrowser,
    setDefaultFeaturedMedia,
    setFeaturedImages,
    setFeaturedVideos,
    showFileBrowserModal,
    clearFeaturedMediaLastChosenFile
} from '../../../app/store/actions';
import {AttachmentTypeEnum, IFileBrowser} from "../../../app/models/attachment";
import {useTranslation} from "react-i18next";
import {IStoreState} from "../../../app/store/rootReducerTypes";
import {connect} from "react-redux";
import {IPostInitFormValues} from "../../../app/models/post";

const {Option} = Select;

interface IFeaturedMediaProps {
    showFileBrowserModal: Function;
    fileBrowser: Function;
    photoFileBrowserDataSource: IFileBrowser[];
    videoFileBrowserDataSource: IFileBrowser[];
    setFeaturedImages: typeof setFeaturedImages;
    setFeaturedVideos: typeof setFeaturedVideos;
    setDefaultFeaturedMedia: typeof setDefaultFeaturedMedia;
    lastChosenFileForFeaturedMedia: IFileBrowserAntdTable | null;
    clearFeaturedMediaLastChosenFile: typeof clearFeaturedMediaLastChosenFile;
    postInitFormValues: IPostInitFormValues;
}

const FeaturedMedia: FC<IFeaturedMediaProps> = ({
                                                    showFileBrowserModal, photoFileBrowserDataSource,
                                                    fileBrowser, videoFileBrowserDataSource,
                                                    setFeaturedImages, setFeaturedVideos, clearFeaturedMediaLastChosenFile,
                                                    setDefaultFeaturedMedia,
                                                    lastChosenFileForFeaturedMedia,
                                                    postInitFormValues
                                                }) => {

    // Translations
    const {t} = useTranslation('core_postCreate');

    // Add featured images btn onClick event
    const addImageOnClick = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        showFileBrowserModal(FileBrowserModalTypeEnum.PHOTO_FILE_BROWSER, FileBrowserCallerTypeEnum.POST_CREATE_FEATURED_MEDIA);
        if (!photoFileBrowserDataSource.length) {
            fileBrowser(AttachmentTypeEnum.Photo);
        }
    }

    // Add featured videos btn onClick event
    const addVideoOnClick = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        showFileBrowserModal(FileBrowserModalTypeEnum.VIDEO_FILE_BROWSER, FileBrowserCallerTypeEnum.POST_CREATE_FEATURED_MEDIA);
        if (!videoFileBrowserDataSource.length) {
            fileBrowser(AttachmentTypeEnum.Video);
        }
    }

    // Featured images and videos together
    const allMedia = postInitFormValues.featuredImages.concat(postInitFormValues.featuredVideos);

    // Removing a featured image
    const removeImageOnConfirm = (img: IFileBrowserAntdTable) => {
        const images = postInitFormValues.featuredImages.filter(i => i !== img);
        setFeaturedImages(images);
        setDefaultFeaturedMedia(allMedia[0].key);
    }

    // Removing a featured video
    const removeVideoOnConfirm = (video: IFileBrowserAntdTable) => {
        const videos = postInitFormValues.featuredVideos.filter(i => i !== video);
        setFeaturedVideos(videos);
        setDefaultFeaturedMedia(allMedia[0].key);
    }

    // onSelect Default Featured Media
    const onSelectDefaultMedia = (val: string) => {
        setDefaultFeaturedMedia(val);
    }

    ///
    useEffect(() => {
        if (lastChosenFileForFeaturedMedia && lastChosenFileForFeaturedMedia.type === AttachmentTypeEnum.Photo) {
            if (postInitFormValues.featuredImages.indexOf(lastChosenFileForFeaturedMedia) === -1) {
                setFeaturedImages([...postInitFormValues.featuredImages, lastChosenFileForFeaturedMedia]);
                clearFeaturedMediaLastChosenFile();
            }
        }
        if (lastChosenFileForFeaturedMedia && lastChosenFileForFeaturedMedia.type === AttachmentTypeEnum.Video) {
            if (postInitFormValues.featuredVideos.indexOf(lastChosenFileForFeaturedMedia) === -1) {
                setFeaturedVideos([...postInitFormValues.featuredVideos, lastChosenFileForFeaturedMedia]);
                clearFeaturedMediaLastChosenFile();
            }
        }
        if (allMedia.length > 0 && !postInitFormValues.defaultFeaturedMedia) {
            setDefaultFeaturedMedia(allMedia[0].key);
        }
    }, [allMedia, clearFeaturedMediaLastChosenFile, postInitFormValues.defaultFeaturedMedia, postInitFormValues.featuredImages, postInitFormValues.featuredVideos,
        lastChosenFileForFeaturedMedia, setDefaultFeaturedMedia, setFeaturedImages, setFeaturedVideos])

    ///
    return (
        <Fragment>
            {allMedia.length > 0 && postInitFormValues.defaultFeaturedMedia &&
            <Fragment>
                <div style={{fontSize: '.75rem'}}>Featured Media:</div>
                <Select value={postInitFormValues.defaultFeaturedMedia} style={{width: '100%'}} onChange={onSelectDefaultMedia}
                        size='small'>
                    {allMedia.map((m) => (
                            <Option key={m.key} value={m.key}>{m.publicFileName}</Option>
                        )
                    )}
                </Select>
            </Fragment>
            }
            <Card
                size="small"
                style={{width: '100%', marginTop: 16}}
                actions={[
                    <div onClick={addImageOnClick} style={{fontSize: '.75rem'}}>
                        <FileAddOutlined/> {t("collapse.featured-media.image-card.action-txt")}
                    </div>,
                ]}
            >
                {postInitFormValues.featuredImages &&
                <List
                    itemLayout="horizontal"
                    size="small"
                    dataSource={postInitFormValues.featuredImages}
                    style={{fontSize: '.7rem', width: '100%'}}
                    renderItem={item => (
                        <List.Item
                            actions={[
                                <Popconfirm
                                    title={t("collapse.featured-media.popconfirm-question")}
                                    onConfirm={() => removeImageOnConfirm(item)}
                                    icon={<QuestionCircleOutlined style={{color: 'red'}}/>}
                                    okText={t("collapse.featured-media.ok-txt")}
                                    cancelText={t("collapse.featured-media.cancel-txt")}
                                >
                                    <a href="#">
                                        <Tooltip placement="top"
                                                 title={t("collapse.featured-media.remove-tooltip")}>
                                            <CloseOutlined className="text danger-color"/>
                                        </Tooltip>
                                    </a>
                                </Popconfirm>
                            ]}
                        >
                            {item.publicFileName}
                        </List.Item>
                    )}
                />
                }
            </Card>
            <Card
                size="small"
                style={{width: '100%', marginTop: 16}}
                actions={[
                    <div onClick={addVideoOnClick} style={{fontSize: '.75rem'}}>
                        <VideoCameraAddOutlined/> {t("collapse.featured-media.video-card.action-txt")}
                    </div>
                ]}
            >
                {postInitFormValues.featuredVideos &&
                <List
                    itemLayout="horizontal"
                    style={{fontSize: '.7rem'}}
                    size="small"
                    dataSource={postInitFormValues.featuredVideos}
                    renderItem={item => (
                        <List.Item
                            actions={[
                                <Popconfirm
                                    title={t("collapse.featured-media.popconfirm-question")}
                                    onConfirm={() => removeVideoOnConfirm(item)}
                                    icon={<QuestionCircleOutlined style={{color: 'red'}}/>}
                                    okText={t("collapse.featured-media.ok-txt")}
                                    cancelText={t("collapse.featured-media.cancel-txt")}
                                >
                                    <a href="#">
                                        <Tooltip placement="top" title={t("collapse.featured-media.remove-tooltip")}>
                                            <CloseOutlined className="text danger-color"/>
                                        </Tooltip>
                                    </a>
                                </Popconfirm>
                            ]}
                        >
                            {item.publicFileName}
                        </List.Item>
                    )}
                />
                }
            </Card>
        </Fragment>
    );
}

// Redux State To Props
const mapStateToProps = ({attachment, post}: IStoreState):
    {
        photoFileBrowserDataSource: IFileBrowser[],
        videoFileBrowserDataSource: IFileBrowser[],
        lastChosenFileForFeaturedMedia: IFileBrowserAntdTable | null,
        postInitFormValues: IPostInitFormValues
    } => {
    return {
        photoFileBrowserDataSource: attachment.photoFileBrowserDataSource,
        videoFileBrowserDataSource: attachment.videoFileBrowserDataSource,
        lastChosenFileForFeaturedMedia: attachment.lastChosenFileForFeaturedMedia,
        postInitFormValues: post.postInitFormValues
    }
}

// Redux Dispatch To Map
const mapDispatchToProps = {
    showFileBrowserModal,
    fileBrowser,
    setFeaturedImages,
    setFeaturedVideos,
    setDefaultFeaturedMedia,
    clearFeaturedMediaLastChosenFile
}

export default connect(mapStateToProps, mapDispatchToProps)(FeaturedMedia);