import React, {FC, Fragment, useEffect, useState} from 'react';
import {Button, Checkbox, Col, Collapse, Form, Input, notification, Row, Space, Spin, Typography} from 'antd';
import '../../../scss/pages/posts/add-new/_add-new.scss';
import StatusAndVisibility from "./StatusAndVisibility";
import Categories from "./Categories";
import Tags from "./Tags";
import Attachments from "./Attachments";
import {useTranslation} from "react-i18next";
import FileBrowserModal from "../../media/fileBrowser/FileBrowserModal";
import {connect} from "react-redux";
import {IStoreState} from "../../../app/store/rootReducerTypes";
import TextEditor from "./TextEditor";
import FeaturedMedia from "./FeaturedMedia";
import {
    createPost,
    editPost,
    getSiteInfo,
    LanguageActionTypeEnum,
    postCreateFormInit,
    setIsCommentAllowed,
    setPostExcerpt,
    setPostFormLoadingState,
    clearPostInitFormValues
} from '../../../app/store/actions';
import {
    IPostAttachment,
    IPostInitFormValues,
    ITaxonomyPost,
    PostStatusEnum,
    PostSubmitFormValues,
    PostTypeEnum,
} from "../../../app/models/post";
import tinymce from 'tinymce/tinymce';
import slugify from "slugify";
import {TaxonomyTypeEnum} from "../../../app/models/taxonomy";
import {v4 as uuid} from "uuid";
import {ISite, SiteTypeEnum} from "../../../app/models/site";
import store from "../../../app/store/store";
import {RouteComponentProps} from "react-router-dom";
import {history} from "../../../index";

interface DetailParams {
    id: string;
}

interface IPostCreateProps {
    loadingInitial: boolean;
    setPostExcerpt: typeof setPostExcerpt;
    setIsCommentAllowed: typeof setIsCommentAllowed;
    submitting: boolean;
    createPost: Function;
    editPost: Function;
    postInitFormValues: IPostInitFormValues;
    postCreateFormInit: Function;
    setPostFormLoadingState: typeof setPostFormLoadingState;
    clearPostInitFormValues: Function;

    site: ISite | null;
    getSiteInfo: Function;

    lang: LanguageActionTypeEnum;
}

const PostCreate: FC<IPostCreateProps & RouteComponentProps<DetailParams>> = ({
                                                                                  loadingInitial,
                                                                                  submitting,
                                                                                  createPost,
                                                                                  editPost,
                                                                                  setPostExcerpt,
                                                                                  setIsCommentAllowed,
                                                                                  setPostFormLoadingState,
                                                                                  site,
                                                                                  getSiteInfo,
                                                                                  postInitFormValues,
                                                                                  postCreateFormInit,
                                                                                  lang,
                                                                                  clearPostInitFormValues,
                                                                                  match,
                                                                              }) => {
    const {t} = useTranslation('core_postCreate');

    const {Title, Paragraph, Text} = Typography;
    const {TextArea} = Input;
    const {Panel} = Collapse;
    const collapseOpenedPanels = (localStorage.getItem("addNewPost__openedCollapsePanels"))?.split(",") ?? [1, 2];
    const editorDefaultHeight = 500;
    const collapseDefaultHeight = `${editorDefaultHeight + 96}px`;
    const [windowWidth, setWindowWidth] = useState(window.innerWidth);
    const [isSubmitBtnDisabled, setIsSubmitBtnDisabled] = useState(true);
    const [isPostTitleDuplicated, setIsPostTitleDuplicated] = useState(false);
    //
    const [createPostForm] = Form.useForm();

    // Sets current window width on resize
    window.addEventListener('resize', (event: UIEvent) => {
        setWindowWidth(window.innerWidth);
    });

    // Collapse callback to save opened panel keys to localstorage
    const collapseCallback = (key: any) => {
        localStorage.setItem("addNewPost__openedCollapsePanels", key);
    }

    // Publish button onClick
    const publishBtnOnClick = (e: React.MouseEvent<HTMLElement, MouseEvent>) => {
        document.getElementById("postContentHiddenSubmit")?.click();
    }


    // Enable/Disable Publish button after checking required inputs having values
    const requiredInputsOnChange = () => {
        const postTitle = document.getElementById("postTitle") as HTMLInputElement;
        const postEditor = store.getState().post.postInitFormValues.content;

        const isTitleEmpty = postTitle.value.length === 0;
        const isContentEmpty = postEditor.length === 0;

        //
        if (!isTitleEmpty && !isContentEmpty) {
            setIsSubmitBtnDisabled(false);
        } else {
            setIsSubmitBtnDisabled(true);
        }
    }

    //
    const handleSubmit = () => {
        const postTitle = document.getElementById("postTitle") as HTMLInputElement;
        const postSubtitle = document.getElementById("postSubtitle") as HTMLInputElement;
        let scheduledFor = '';
        let postStatus = PostStatusEnum.Publish;
        if (postInitFormValues.isPending) {
            postStatus = PostStatusEnum.Pending;
        } else if (postInitFormValues.isScheduled) {
            postStatus = PostStatusEnum.Future;
            scheduledFor = postInitFormValues.confirmedScheduleDateAndTime;
        }

        const allMedia = postInitFormValues.featuredImages.concat(postInitFormValues.featuredVideos);
        let postAttachments: IPostAttachment[] = [];

        allMedia.forEach(m => {
            if (m.key === postInitFormValues.defaultFeaturedMedia) {
                console.log("default selected attachment: ", m.publicFileName);
                postAttachments.push({isMain: true, attachmentId: m.key})
            } else {
                postAttachments.push({isMain: false, attachmentId: m.key})
            }
        })

        let taxonomyPosts: ITaxonomyPost[] = [];
        if (postInitFormValues.selectedCategories.length) {
            postInitFormValues.selectedCategories.forEach(sc => taxonomyPosts.push({taxonomyId: sc.value}))
        }

        if (postInitFormValues.tags.length) {
            postInitFormValues.tags.forEach(t => taxonomyPosts.push({
                taxonomy: {
                    type: TaxonomyTypeEnum.tag,
                    term: {
                        name: t,
                        slug: slugify(t),
                    },
                    parentId: null,
                    siteId: site?.id
                }
            }))
        }

        const postFormValues = new PostSubmitFormValues({
            id: postInitFormValues.id ? postInitFormValues.id : uuid(),
            title: postTitle.value,
            subtitle: postSubtitle.value,
            excerpt: postInitFormValues.excerpt,
            content: tinymce.get("addPostEditor").getContent(),
            slug: slugify(postTitle.value),
            visibility: postInitFormValues.visibility,
            postStatus,
            scheduledFor,
            commentAllowed: postInitFormValues.isCommentAllowed,
            type: PostTypeEnum.Posts,
            isPinned: postInitFormValues.isPinned,
            postAttachments,
            taxonomyPosts
        });

        // Create a new post
        !postInitFormValues.editing && createPost(postFormValues)
            .then(() => {
                history.push(`/admin/posts/edit/${postFormValues.id}`)
                setIsPostTitleDuplicated(false);
                notification.success({
                    message: t("messages.success"),
                    description: t("messages.post-creation-success-msg"),
                })
            })
            .catch((err: any) => {
                if (err.data.errors.title) {
                    setIsPostTitleDuplicated(true);
                }
                notification.error({
                    message: t("messages.error"),
                    description: t("messages.post-creation-error-msg"),
                })
            })

        // Edit an existing post
        postInitFormValues.editing && editPost(postFormValues)
            .then(() => {
                setIsPostTitleDuplicated(false);
                notification.success({
                    message: t("messages.success"),
                    description: t("messages.post-modification-success-msg"),
                })
            })
            .catch((err: any) => {
                if (err.data.errors.title) {
                    setIsPostTitleDuplicated(true);
                }
                notification.error({
                    message: t("messages.error"),
                    description: t("messages.post-modification-error-msg"),
                })
            })
    }

    ///
    useEffect(() => {
        (!site || site?.siteType !== SiteTypeEnum.Blog) && getSiteInfo(SiteTypeEnum.Blog);

        if (match.params.id) {
            if (!postInitFormValues || postInitFormValues.id !== match.params.id) {
                postInitFormValues && setPostFormLoadingState(true);
                postCreateFormInit(match.params.id, lang).then((p: IPostInitFormValues) => {
                    createPostForm.setFieldsValue({
                        postTitle: p.title,
                        postSubtitle: p.subtitle,
                    })
                });

            } else {
                postInitFormValues && setPostFormLoadingState(true);
                createPostForm.setFieldsValue({
                    postTitle: postInitFormValues.title,
                    postSubtitle: postInitFormValues.subtitle,
                })
            }
        }
        else {
            clearPostInitFormValues();
        }

        return () => {
            if (tinymce.EditorManager.activeEditor?.id === "addPostEditor") {
                tinymce.EditorManager.activeEditor.destroy();
                console.log("An instance of TinyMCE has been destroyed!");
                setPostFormLoadingState(false);
            }
        }
    }, [
        clearPostInitFormValues,
        createPostForm,
        getSiteInfo,
        lang,
        match.params.id,
        postCreateFormInit,
        setPostFormLoadingState,
        site,
    ])

    ///
    return (
        <Fragment>
            <Spin spinning={loadingInitial}>
                <Row justify="space-between">
                    <Typography>
                        <Title level={4}>{t("title")}</Title>
                        <Paragraph ellipsis>
                            <Text type="secondary">{t("description")}</Text>
                        </Paragraph>
                    </Typography>
                    <Button
                        type="primary"
                        loading={submitting}
                        id="publishPostBtn"
                        onClick={(e) => handleSubmit()}
                        disabled={isSubmitBtnDisabled}
                    >
                        {postInitFormValues.publishBtnTxt}
                    </Button>
                </Row>
                <Row gutter={16}>
                    <Col xs={24} lg={16} xl={17} xxl={18}>
                        <Form form={createPostForm}>
                            <Space direction="vertical" style={{width: "100%"}}>
                                <Row>
                                    <Col xs={24}>
                                        <Form.Item
                                            name="postTitle"
                                            rules={[{required: true, message: t("messages.title-required-msg")}]}
                                            style={{margin: "0"}}
                                            hasFeedback
                                            validateStatus={isPostTitleDuplicated ? 'error' : ''}
                                            help={isPostTitleDuplicated && t("messages.duplicate-title-msg")}
                                        >
                                            <Input id="postTitle"
                                                   type="text"
                                                   placeholder={t("inputs.title.placeholder")}
                                                   size="large"
                                                   maxLength={150}
                                                   onChange={(e) => {
                                                       requiredInputsOnChange();
                                                   }
                                                   }
                                            />
                                        </Form.Item>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col xs={24}>
                                        <Form.Item
                                            name="postSubtitle"
                                            style={{margin: "0"}}
                                        >
                                            <Input id="postSubtitle"
                                                   type="text"
                                                   placeholder={t("inputs.subtitle.placeholder")}
                                                   size="large"
                                                   maxLength={150}
                                                   onChange={(e) => {
                                                       requiredInputsOnChange();
                                                   }
                                                   }
                                            />
                                        </Form.Item>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col span={24}>
                                        <Form.Item
                                            rules={[{required: true, message: 'Post content cannot be empty!'}]}
                                            style={{margin: "0"}}
                                        >
                                            <TextEditor requiredInputsOnChange={requiredInputsOnChange}
                                                        editorDefaultHeight={editorDefaultHeight}
                                            />
                                            <FileBrowserModal/>
                                        </Form.Item>
                                    </Col>
                                </Row>
                            </Space>
                        </Form>
                    </Col>
                    <Col xs={24} lg={8} xl={7} xxl={6}
                         style={windowWidth >= 992 ? {height: collapseDefaultHeight, overflow: "auto"} : {}}>
                        <Row>
                            <Col xs={24}>
                                <Collapse defaultActiveKey={collapseOpenedPanels} onChange={collapseCallback}
                                          style={{fontSize: "12px"}}>
                                    <Panel header={<b>{t("collapse.status-and-visibility.title")}</b>} key="1">
                                        <StatusAndVisibility/>
                                    </Panel>
                                    <Panel header={<b>{t("collapse.categories.title")}</b>} key="2">
                                        <Categories/>
                                    </Panel>
                                    <Panel header={<b>{t("collapse.tags.title")}</b>} key="3">
                                        <Tags/>
                                    </Panel>
                                    <Panel header={<b>{t("collapse.attachments.title")}</b>} key="5">
                                        <Attachments/>
                                    </Panel>
                                    <Panel header={<b>{t("collapse.featured-media.title")}</b>} key="6">
                                        <FeaturedMedia/>
                                    </Panel>
                                    <Panel header={<b>{t("collapse.excerpt.title")}</b>} key="7">
                                        {t("collapse.excerpt.content.description")}
                                        <TextArea
                                            id="addPostExcerpt"
                                            style={{fontSize: "12px"}}
                                            name="addPostExcerpt"
                                            autoSize={{minRows: 4}}
                                            value={postInitFormValues.excerpt && postInitFormValues.excerpt}
                                            onChange={(e) => setPostExcerpt(e.target.value)}
                                        />
                                    </Panel>
                                    <Panel header={<b>{t("collapse.discussion.title")}</b>} key="8">
                                        <Checkbox
                                            onChange={(e) => setIsCommentAllowed(e.target.checked)}
                                            style={{fontSize: "12px"}}
                                            checked={postInitFormValues.isCommentAllowed}
                                        >
                                            {t("collapse.discussion.checkboxes.allow-comments")}
                                        </Checkbox>
                                    </Panel>
                                </Collapse>
                            </Col>
                        </Row>
                    </Col>
                </Row>
            </Spin>
        </Fragment>
    );
};

// Redux State To Map
const mapStateToProps = ({post, site, locale}: IStoreState):
    {
        loadingInitial: boolean,
        submitting: boolean,
        postInitFormValues: IPostInitFormValues,

        site: ISite | null,

        lang: LanguageActionTypeEnum
    } => {
    return {
        loadingInitial: post.loadingInitial,
        submitting: post.submitting,
        postInitFormValues: post.postInitFormValues,

        site: site.site,

        lang: locale.lang
    }
}

// Redux Dispatch To Mao
const mapDispatchToProps = {
    setPostExcerpt,
    setIsCommentAllowed,
    createPost,
    editPost,
    getSiteInfo,
    postCreateFormInit,
    setPostFormLoadingState,
    clearPostInitFormValues
}

export default connect(mapStateToProps, mapDispatchToProps)(PostCreate);
