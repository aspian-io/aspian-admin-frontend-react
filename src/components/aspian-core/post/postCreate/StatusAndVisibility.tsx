import React, {FC, Fragment, useContext} from 'react';
import {Checkbox, Col, Row, Select} from "antd";
import {CheckboxChangeEvent} from "antd/es/checkbox";
import SchedulePopover from "./SchedulePopover";
import {useTranslation} from "react-i18next";
import {connect} from "react-redux";
import {setPostVisibility} from "../../../../app/store/aspian-core/actions";

interface IStatusAndVisibilityProps {
    setPostVisibility: typeof setPostVisibility;
}

const StatusAndVisibility: FC<IStatusAndVisibilityProps> = ({setPostVisibility}) => {

    const { t } = useTranslation('core_postCreate');

    // Pinned to the top of the blog checkbox on change event
    const isPinned = (e: CheckboxChangeEvent) => {
        console.log(`checked = ${e.target.checked}`);
    }

    // Pending review checkbox on change event
    const isPending = (e: CheckboxChangeEvent) => {
        console.log(`checked = ${e.target.checked}`);
    }

    // Visibility Select onChange
    const visibilitySelectOnChange = (value: string) => {
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
                    <Select showArrow={false} defaultValue="public" dropdownMatchSelectWidth={100}
                            style={{color: "#1890ff"}}
                            bordered={false}
                            onChange={visibilitySelectOnChange}
                    >
                        <Select.Option value="public">{t("collapse.status-and-visibility.content.visibility.options.public")}</Select.Option>
                        <Select.Option value="private">{t("collapse.status-and-visibility.content.visibility.options.private")}</Select.Option>
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
                <Checkbox onChange={isPinned} style={{fontSize: "12px"}}>
                    {t("collapse.status-and-visibility.content.checkboxes.pinned-to-top")}
                </Checkbox>
            </Row>
            <Row style={{margin: "20px 0 10px"}} align="middle">
                <Checkbox onChange={isPending} style={{fontSize: "12px"}}>
                    {t("collapse.status-and-visibility.content.checkboxes.pending")}
                </Checkbox>
            </Row>
        </Fragment>
    );
};

// Redux Dispatch To Map
const mapDispatchToProps = {
    setPostVisibility
}

export default connect(null, mapDispatchToProps)(StatusAndVisibility);