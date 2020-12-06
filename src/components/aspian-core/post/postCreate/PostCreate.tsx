import React, {FC, Fragment, useState} from 'react';
import {Button, Checkbox, Col, Collapse, Form, Input, Row, Space, Typography} from 'antd';
import {CheckboxChangeEvent} from "antd/es/checkbox";
import '../../../../scss/aspian-core/pages/posts/add-new/_add-new.scss';
import StatusAndVisibility from "./StatusAndVisibility";
import Categories from "./Categories";
import Tags from "./Tags";
import Attachments from "./Attachments";
import {useTranslation} from "react-i18next";
import ParentPost from "./ParentPost";
import FileBrowserModal from "../../media/fileBrowser/FileBrowserModal";
import {connect} from "react-redux";
import {IStoreState} from "../../../../app/store/rootReducerTypes";
import TextEditor from "./TextEditor";

interface IPostCreateProps {
    publishBtnTxt: string;
    postEditorContent: string;
}

const PostCreate: FC<IPostCreateProps> = ({publishBtnTxt, postEditorContent}) => {
    const {t} = useTranslation('core_postCreate');

    const {Title, Paragraph, Text} = Typography;
    const {TextArea} = Input;
    const {Panel} = Collapse;
    const collapseOpenedPanels = (localStorage.getItem("addNewPost__openedCollapsePanels"))?.split(",") ?? [1, 2];
    const editorDefaultHeight = 500;
    const collapseDefaultHeight = `${editorDefaultHeight + 96}px`;
    const [windowWidth, setWindowWidth] = useState(window.innerWidth);

    // Sets current window width on resize
    window.addEventListener('resize', (event: UIEvent) => {
        setWindowWidth(window.innerWidth);
    });

    // Collapse callback to save opened panel keys to localstorage
    const collapseCallback = (key: any) => {
        localStorage.setItem("addNewPost__openedCollapsePanels", key);
    }

    // Allow comments checkbox on change event
    const isCommentAllowed = (e: CheckboxChangeEvent) => {
        console.log(`checked = ${e.target.checked}`);
    }

    // Publish button onClick
    const publishBtnOnClick = (e: React.MouseEvent<HTMLElement, MouseEvent>) => {
        document.getElementById("postContentHiddenSubmit")?.click();
    }


    // Enable/Disable Publish button after checking required inputs having values
    const requiredInputsOnChange = () => {
        const postTitle = document.getElementById("postTitle") as HTMLInputElement;
        const postSubtitle = document.getElementById("postSubtitle") as HTMLInputElement;
        const publishBtn = document.getElementById("publishPostBtn");

        const isTitleEmpty = postTitle.value.length === 0;
        const isSubtitleEmpty = postSubtitle.value.length === 0;
        const isContentEmpty = postEditorContent.length === 0;

        //
        if (!isTitleEmpty && !isSubtitleEmpty && !isContentEmpty) {
            publishBtn?.removeAttribute("disabled");
        } else {
            publishBtn?.setAttribute("disabled", "true");
        }
    }

    ///
    return (
        <Fragment>
            <Form id="addNewPostForm" name="addNewPostForm">
                <input type="hidden" name="title"/>
                <input type="hidden" name="subTitle"/>
            </Form>
            <Row justify="space-between">
                <Typography>
                    <Title level={4}>{t("title")}</Title>
                    <Paragraph ellipsis>
                        <Text type="secondary">{t("description")}</Text>
                    </Paragraph>
                </Typography>
                <Button type="primary" id="publishPostBtn" onClick={publishBtnOnClick} disabled>
                    {publishBtnTxt}
                </Button>
            </Row>
            <Row gutter={16}>
                <Col xs={24} lg={16} xl={17} xxl={18}>
                    <Form id="postContentForm" onSubmitCapture={(e) => {
                        e.preventDefault();
                        console.log("submitting")
                    }}>
                        <Button id="postContentHiddenSubmit" htmlType="submit" style={{display: "none"}}/>
                        <Space direction="vertical" style={{width: "100%"}}>
                            <Row>
                                <Col xs={24}>
                                    <Form.Item
                                        name="postTitle"
                                        rules={[{required: true, message: 'Please input post title!'}]}
                                        style={{margin: "0"}}
                                    >
                                        <Input id="postTitle"
                                               type="text"
                                               placeholder={t("inputs.title.placeholder")}
                                               size="large"
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
                                        rules={[{required: true, message: 'Please input post subtitle!'}]}
                                        style={{margin: "0"}}
                                    >
                                        <Input id="postSubtitle"
                                               type="text"
                                               placeholder={t("inputs.subtitle.placeholder")}
                                               size="large"
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
                                                    editorDefaultHeight={editorDefaultHeight}/>
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
                                <Panel header={<b>{t("collapse.parent-post.title")}</b>} key="4">
                                    <ParentPost/>
                                </Panel>
                                <Panel header={<b>{t("collapse.attachments.title")}</b>} key="5">
                                    <Attachments/>
                                </Panel>
                                <Panel header={<b>{t("collapse.excerpt.title")}</b>} key="6">
                                    {t("collapse.excerpt.content.description")}
                                    <TextArea id="addPostExcerpt" autoSize={{minRows: 4}}/>
                                </Panel>
                                <Panel header={<b>{t("collapse.discussion.title")}</b>} key="7">
                                    <Checkbox onChange={isCommentAllowed} style={{fontSize: "12px"}}>
                                        {t("collapse.discussion.checkboxes.allow-comments")}
                                    </Checkbox>
                                </Panel>
                            </Collapse>
                        </Col>
                    </Row>
                </Col>
            </Row>
        </Fragment>
    );
};

// Redux State To Map
const mapStateToProps = ({post}: IStoreState): { publishBtnTxt: string, postEditorContent: string } => {
    return {publishBtnTxt: post.publishBtnTxt, postEditorContent: post.postEditorContent}
}

export default connect(mapStateToProps)(PostCreate);
