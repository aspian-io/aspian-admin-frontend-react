import React, {FC, MouseEvent, useEffect, useState} from "react";
import {Button, DatePicker, Popover, Space, TimePicker} from "antd";
import moment, {Moment} from "moment";
import dayjs, {Dayjs} from 'dayjs';
import jalaliday from 'jalaliday';

import jalaliMoment from "jalali-moment";
import {useTranslation} from "react-i18next";
import {e2p} from "../../../js-ts/base/NumberConverter";
import {DatePicker as DatePickerJalali} from "antd-jalali";
import {
    LanguageActionTypeEnum,
    setConfirmedScheduleDate,
    setConfirmedScheduleDateAndTime,
    setConfirmedScheduleTime,
    setIsScheduled,
    setJalaliDate,
    setPublishBtnTxt,
    setPublishScheduledBtnTxt,
    setSchedulePopoverDate,
    setSchedulePopoverTime
} from "../../../app/store/actions";
import {IStoreState} from "../../../app/store/rootReducerTypes";
import {connect} from "react-redux";
import {RouteComponentProps, withRouter} from "react-router-dom";
import {IPost, IPostInitFormValues} from "../../../app/models/post";

interface DetailParams {
    id: string;
}

interface ISchedulePopoverProps {
    lang: LanguageActionTypeEnum;
    setPublishBtnTxt: typeof setPublishBtnTxt;
    setIsScheduled: typeof setIsScheduled;
    setConfirmedScheduleDate: typeof setConfirmedScheduleDate;
    setConfirmedScheduleTime: typeof setConfirmedScheduleTime;
    setConfirmedScheduleDateAndTime: typeof setConfirmedScheduleDateAndTime;
    setSchedulePopoverDate: typeof setSchedulePopoverDate;
    setSchedulePopoverTime: typeof setSchedulePopoverTime;
    setJalaliDate: typeof setJalaliDate;
    postInitFormValues: IPostInitFormValues;
    setPublishScheduledBtnTxt: typeof setPublishScheduledBtnTxt;
}

const SchedulePopover: FC<ISchedulePopoverProps & RouteComponentProps<DetailParams>> = ({
                                                                                            lang,
                                                                                            setPublishBtnTxt,
                                                                                            setIsScheduled,
                                                                                            setConfirmedScheduleDate,
                                                                                            setConfirmedScheduleTime,
                                                                                            setConfirmedScheduleDateAndTime,
                                                                                            setPublishScheduledBtnTxt,
                                                                                            setSchedulePopoverDate,
                                                                                            setSchedulePopoverTime,
                                                                                            setJalaliDate,
                                                                                            postInitFormValues,
                                                                                            match
                                                                                        }) => {

    const {t} = useTranslation('core_postCreate');
    // states
    const [schedulePopoverIsVisible, setSchedulePopoverIsVisible] = useState(false);

    dayjs.extend(jalaliday);
    // @ts-ignore
    dayjs.calendar('jalali');


    useEffect(() => {
        if (!postInitFormValues.editing && postInitFormValues.isScheduled) {
            const jalaliDate = jalaliMoment(postInitFormValues.confirmedScheduleDate.toString()).locale("fa").format("ll");
            const jalaliTime = jalaliMoment(postInitFormValues.confirmedScheduleTime.toString()).locale("fa").format("h:mm:ss a");
            const gregorianDate = moment(postInitFormValues.confirmedScheduleDate.toString()).locale("en").format("ll");
            const gregorianTime = moment(postInitFormValues.confirmedScheduleTime.toString()).locale("en").format("LTS");

            const persianBtnText = `${e2p(jalaliDate)} ${e2p(jalaliTime)}`;
            const englishBtnText = `${gregorianDate} ${gregorianTime}`;
            const utcDateTime = `${moment(postInitFormValues.confirmedScheduleDate).utc().format('YYYY-MM-DD')} ${moment(postInitFormValues.confirmedScheduleTime).utc().format('HH:mm:ss')}`;
            setConfirmedScheduleDateAndTime(utcDateTime);

            const scheduledDate = new Date(utcDateTime);
            const dateNow = new Date(moment(new Date()).utc().format('YYYY-MM-DD HH:mm:ss'));
            (dateNow.getTime() < scheduledDate.getTime()) ? setPublishBtnTxt(t("button.schedule")) : setPublishBtnTxt(t("button.publish"));

            lang === LanguageActionTypeEnum.fa ? setPublishScheduledBtnTxt(persianBtnText) : setPublishScheduledBtnTxt(englishBtnText);
        } else if (postInitFormValues.editing) {
            const jalaliDate = jalaliMoment(postInitFormValues.confirmedScheduleDate.toString()).locale("fa").format("ll");
            const jalaliTime = jalaliMoment(postInitFormValues.confirmedScheduleTime.toString()).locale("fa").format("h:mm:ss a");
            const gregorianDate = moment(postInitFormValues.confirmedScheduleDate.toString()).locale("en").format("ll");
            const gregorianTime = moment(postInitFormValues.confirmedScheduleTime.toString()).locale("en").format("LTS");

            const persianBtnText = `${e2p(jalaliDate)} ${e2p(jalaliTime)}`;
            const englishBtnText = `${gregorianDate} ${gregorianTime}`;
            const utcDateTime = `${moment(postInitFormValues.confirmedScheduleDate).utc().format('YYYY-MM-DD')} ${moment(postInitFormValues.confirmedScheduleTime).utc().format('HH:mm:ss')}`;
            setConfirmedScheduleDateAndTime(utcDateTime);

            setPublishBtnTxt(t("button.update"));

            lang === LanguageActionTypeEnum.fa ? setPublishScheduledBtnTxt(persianBtnText) : setPublishScheduledBtnTxt(englishBtnText);
        } else {
            setPublishBtnTxt(t("button.publish"));
        }
    }, [lang, setConfirmedScheduleDateAndTime, setPublishBtnTxt, setPublishScheduledBtnTxt, t, postInitFormValues.editing, postInitFormValues.isScheduled])


    // Schedule datepicker onchange event
    const ScheduleDatePickerOnChange = (date: Moment | null, dateString: string) => {
        if (date) setSchedulePopoverDate(date);
    }

    // Schedule timepicker onchange event
    const ScheduleTimePickerOnChange = (time: Moment | null, timeString: string) => {
        if (time) setSchedulePopoverTime(time);
    }

    // Schedule date and time popover Confirm button onClick event
    const scheduleConfirmOnClick = (e: MouseEvent<HTMLElement, globalThis.MouseEvent>) => {
        setIsScheduled(true);
        setConfirmedScheduleDate(postInitFormValues.schedulePopoverDate);
        setConfirmedScheduleTime(postInitFormValues.schedulePopoverTime);

        //const jalaliScheduledDate = jalaliMoment(schedulePopoverDate.toDate(), 'YYYY/M/D').locale("fa");
        setJalaliDate(dayjs(postInitFormValues.schedulePopoverDate.toString()));

        const utcDateTime = `${moment(postInitFormValues.schedulePopoverDate).utc().format('YYYY-MM-DD')} ${moment(postInitFormValues.schedulePopoverTime).utc().format('HH:mm:ss')}`;
        setConfirmedScheduleDateAndTime(utcDateTime);

        const jalaliDate = jalaliMoment(postInitFormValues.schedulePopoverDate.toString()).locale("fa").format("ll");
        const jalaliTime = jalaliMoment(postInitFormValues.schedulePopoverTime.toString()).locale("fa").format("h:mm:ss a");
        const gregorianDate = moment(postInitFormValues.schedulePopoverDate.toString()).locale("en").format("ll");
        const gregorianTime = moment(postInitFormValues.schedulePopoverTime.toString()).locale("en").format("LTS");

        const persianBtnText = `${e2p(jalaliDate)} ${e2p(jalaliTime)}`;
        const englishBtnText = `${gregorianDate} ${gregorianTime}`;

        lang === LanguageActionTypeEnum.fa ? setPublishScheduledBtnTxt(persianBtnText) : setPublishScheduledBtnTxt(englishBtnText);

        if (postInitFormValues.editing) {
            setPublishBtnTxt(t("button.update"));
        }

        if (!postInitFormValues.editing) {
            const scheduledDate = new Date(utcDateTime);
            const dateNow = new Date(moment(new Date()).utc().format('YYYY-MM-DD HH:mm:ss'));
            (dateNow.getTime() < scheduledDate.getTime()) ? setPublishBtnTxt(t("button.schedule")) : setPublishBtnTxt(t("button.publish"));
        }

        setSchedulePopoverIsVisible(false)
    }

    // Schedule date and time popover immediately button onClick event
    const scheduleImmediatelyOnClick = (e: MouseEvent<HTMLElement, globalThis.MouseEvent>) => {
        setIsScheduled(false);
        const pubBtnTxt = t("button.publish");
        setPublishBtnTxt(pubBtnTxt);
        setSchedulePopoverIsVisible(false)
    }

    // Jalali date onChange event
    const jalaliDateOnChange = (date: Dayjs, dateString: string) => {
        const dateToMoment = moment(date.toDate(), "YYYY-MM-DD");

        setJalaliDate(date);
        setSchedulePopoverDate(dateToMoment)
    }

    // Publish status, Schedule popover contents
    const schedulePopoverContent = (currentLang: LanguageActionTypeEnum = LanguageActionTypeEnum.en) => (
        <div>
            {currentLang === LanguageActionTypeEnum.fa && (
                <DatePickerJalali
                    defaultValue={postInitFormValues.jalaliDate}
                    allowClear={false}
                    onChange={jalaliDateOnChange}
                    bordered={false}
                />
            )}
            {currentLang !== LanguageActionTypeEnum.fa && (
                <DatePicker
                    defaultValue={postInitFormValues.schedulePopoverDate}
                    allowClear={false}
                    onChange={ScheduleDatePickerOnChange}
                    bordered={false}
                />
            )}
            <TimePicker inputReadOnly defaultValue={postInitFormValues.schedulePopoverTime} allowClear={false}
                        onChange={ScheduleTimePickerOnChange}
                        bordered={false}/>
            <div style={{marginTop: "5px"}}>
                <Space>
                    <Button type="primary" size="small" style={{width: "120px"}}
                            onClick={scheduleConfirmOnClick}>{t("collapse.status-and-visibility.content.publish.buttons.schedule")}</Button>
                    <Button size="small" style={{width: "120px"}}
                            onClick={scheduleImmediatelyOnClick}>{t("collapse.status-and-visibility.content.publish.buttons.immediately")}</Button>
                </Space>
            </div>
        </div>
    );

    ///
    return (
        <Popover placement="bottomRight" content={schedulePopoverContent(lang)}
                 visible={schedulePopoverIsVisible}
                 onVisibleChange={(visible) => setSchedulePopoverIsVisible(visible)}
                 trigger="click">
            <Button type="link" style={{
                fontSize: "12px",
                padding: "0 11px"
            }}>{postInitFormValues.publishScheduledBtnTxt}</Button>
        </Popover>
    );
}

// Redux State To Map
const mapStateToProps = ({locale, post}: IStoreState): {
    lang: LanguageActionTypeEnum,
    postInitFormValues: IPostInitFormValues
} => {
    return {
        lang: locale.lang,
        postInitFormValues: post.postInitFormValues
    }
}

// Redux Dispatch To Map
const mapDispatchToProps = {
    setPublishBtnTxt,
    setIsScheduled,
    setConfirmedScheduleDate,
    setConfirmedScheduleTime,
    setConfirmedScheduleDateAndTime,
    setPublishScheduledBtnTxt,
    setSchedulePopoverDate,
    setSchedulePopoverTime,
    setJalaliDate
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(SchedulePopover));