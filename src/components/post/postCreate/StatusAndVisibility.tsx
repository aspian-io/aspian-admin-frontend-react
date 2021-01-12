import React, {FC, Fragment, useEffect} from 'react';
import {Checkbox, Col, Row, Select} from "antd";
import {CheckboxChangeEvent} from "antd/es/checkbox";
import SchedulePopover from "./SchedulePopover";
import {useTranslation} from "react-i18next";
import {connect} from "react-redux";
import {setIsPending, setIsPinned, setPostVisibility} from "../../../app/store/actions";
import {IPost, IPostInitFormValues, PostStatusEnum, PostVisibilityEnum} from "../../../app/models/post";
import {IStoreState} from "../../../app/store/rootReducerTypes";
import {RouteComponentProps, withRouter} from "react-router-dom";

interface DetailParams {
    id: string;
}

interface IStatusAndVisibilityProps {
    setIsPinned: typeof setIsPinned;
    setIsPending: typeof setIsPending;
    setPostVisibility: typeof setPostVisibility;
    postInitFormValues: IPostInitFormValues;
}

const StatusAndVisibility: FC<IStatusAndVisibilityProps & RouteComponentProps<DetailParams>> = ({
                                                                                                    setPostVisibility,
                                                                                                    setIsPending,
                                                                                                    setIsPinned,
                                                                                                    postInitFormValues,
                                                                                                    match
                                                                                                }) => {

    const {t} = useTranslation('core_postCreate');

    // Pinned to the top of the blog checkbox on change event
    const isPinnedOnChange = (e: CheckboxChangeEvent) => {
        setIsPinned(e.target.checked);
    }

    // Pending review checkbox on change event
    const isPendingOnChange = (e: CheckboxChangeEvent) => {
        setIsPending(e.target.checked);
    }

    // Visibility Select onChange
    const visibilitySelectOnChange = (value: PostVisibilityEnum) => {
        setPostVisibility(value);
    }

    ///
    return (
        <Fragment>
            <Row justify="space-between" align="middle">
                <Col>
                    {t("collapse.status-and-visibility.content.visibility.name")}
                </Col>
                <Col>
                    <Select
                        showArrow={false}
                        defaultValue={PostVisibilityEnum.Public}
                        value={postInitFormValues.visibility}
                        dropdownMatchSelectWidth={100}
                        style={{color: "#1890ff", fontSize: "12px"}}
                        bordered={false}
                        onChange={visibilitySelectOnChange}
                        size="small"
                    >
                        <Select.Option
                            style={{fontSize: "12px"}}
                            value={PostVisibilityEnum.Public}
                        >
                            {t("collapse.status-and-visibility.content.visibility.options.public")}
                        </Select.Option>
                        <Select.Option
                            style={{fontSize: "12px"}}
                            value={PostVisibilityEnum.Private}
                        >
                            {t("collapse.status-and-visibility.content.visibility.options.private")}
                        </Select.Option>
                    </Select>
                </Col>
            </Row>
            <Row justify="space-between" align="middle" style={{marginTop: "10px"}}>
                <Col>
                    {t("collapse.status-and-visibility.content.publish.name")}
                </Col>
                <Col>
                    <SchedulePopover/>
                </Col>
            </Row>
            <Row style={{marginTop: "15px"}} align="middle">
                <Checkbox onChange={isPinnedOnChange} checked={postInitFormValues.isPinned} style={{fontSize: "12px"}}>
                    {t("collapse.status-and-visibility.content.checkboxes.pinned-to-top")}
                </Checkbox>
            </Row>
            <Row style={{margin: "20px 0 10px"}} align="middle">
                <Checkbox onChange={isPendingOnChange} checked={postInitFormValues.isPending} style={{fontSize: "12px"}}>
                    {t("collapse.status-and-visibility.content.checkboxes.pending")}
                </Checkbox>
            </Row>
        </Fragment>
    );
};

// Redux State To Map
const mapStateToProps = ({post}: IStoreState): { postInitFormValues: IPostInitFormValues } => {
    return {
        postInitFormValues: post.postInitFormValues
    }
}

// Redux Dispatch To Map
const mapDispatchToProps = {
    setPostVisibility,
    setIsPinned,
    setIsPending
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(StatusAndVisibility));