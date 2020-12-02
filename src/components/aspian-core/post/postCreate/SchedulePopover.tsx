import React, {FC, MouseEvent, useContext, useEffect, useState} from "react";
import {Button, DatePicker, Input, Popover, Space, TimePicker} from "antd";
import {CalendarOutlined} from '@ant-design/icons';
import moment, {Moment} from "moment";
import jalaliMoment from "jalali-moment";
import PersianDatePicker, {DayValue, utils} from "react-modern-calendar-datepicker";
import {useTranslation} from "react-i18next";
import {e2p} from "../../../../js-ts/aspian-core/base/NumberConverter";
import {LanguageActionTypeEnum, setPublishBtnTxt} from "../../../../app/store/aspian-core/actions";
import {IStoreState} from "../../../../app/store/rootReducerTypes";
import {connect} from "react-redux";

interface ISchedulePopoverProps {
    lang: LanguageActionTypeEnum;
    setPublishBtnTxt: typeof setPublishBtnTxt;
}

const SchedulePopover: FC<ISchedulePopoverProps> = ({lang, setPublishBtnTxt}) => {

    const { t } = useTranslation('core_postCreate');
    // states
    const [schedulePopoverIsVisible, setSchedulePopoverIsVisible] = useState(false);
    const [publishScheduledBtnTxt, setPublishScheduledBtnTxt] = useState(() => t("collapse.status-and-visibility.content.publish.buttons.immediately"));
    const [schedulePopoverDate, setSchedulePopoverDate] = useState(moment(new Date(), 'YYYY-MM-DD'));
    const [schedulePopoverTime, setSchedulePopoverTime] = useState(moment(new Date(), 'HH:mm:ss'));
    const [confirmedScheduleDate, setConfirmedScheduleDate] = useState(moment(new Date(), 'YYYY-MM-DD'));
    const [confirmedScheduleTime, setConfirmedScheduleTime] = useState(moment(new Date(), 'HH:mm:ss'));
    const [isScheduled, setIsScheduled] = useState(false);

    // Jalali date time for jalali datepicker value
    const jalaliDateNow = jalaliMoment(schedulePopoverDate.toDate(), 'YYYY/M/D').locale("fa");
    const [date, setDate] = React.useState<DayValue>({year: Number(jalaliDateNow.format("YYYY")), month: Number(jalaliDateNow.format("M")), day: Number(jalaliDateNow.format("D"))});


    useEffect(() => {
        if (isScheduled) {
            const jalaliDate = jalaliMoment(confirmedScheduleDate.toString()).locale("fa").format("ll");
            const jalaliTime = jalaliMoment(confirmedScheduleTime.toString()).locale("fa").format("h:mm:ss a");
            const gregorianDate = moment(confirmedScheduleDate.toString()).locale("en").format("ll");
            const gregorianTime = moment(confirmedScheduleTime.toString()).locale("en").format("LTS");

            const persianBtnText = `${e2p(jalaliDate)} ${e2p(jalaliTime)}`;
            const englishBtnText = `${gregorianDate} ${gregorianTime}`;
            setPublishBtnTxt(t("button.schedule"));

            lang === LanguageActionTypeEnum.fa ? setPublishScheduledBtnTxt(persianBtnText) : setPublishScheduledBtnTxt(englishBtnText);
        } else {
            setPublishBtnTxt(t("button.publish"));
        }
    }, [isScheduled, lang, confirmedScheduleDate, confirmedScheduleTime, setPublishBtnTxt, t])


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
        setConfirmedScheduleDate(schedulePopoverDate);
        setConfirmedScheduleTime(schedulePopoverTime);

        const jalaliScheduledDate = jalaliMoment(schedulePopoverDate.toDate(), 'YYYY/M/D').locale("fa");
        setDate({year: Number(jalaliScheduledDate.format("YYYY")), month: Number(jalaliScheduledDate.format("M")), day: Number(jalaliScheduledDate.format("D"))});

        (new Date() < schedulePopoverDate.toDate()) ? setPublishBtnTxt(t("button.schedule")) : setPublishBtnTxt(t("button.publish"));
        setSchedulePopoverIsVisible(false)
    }

    // Schedule date and time popover immediately button onClick event
    const scheduleImmediatelyOnClick = (e: MouseEvent<HTMLElement, globalThis.MouseEvent>) => {
        setIsScheduled(false);
        setPublishBtnTxt(t("collapse.status-and-visibility.publish.buttons.immediately"))
        setSchedulePopoverIsVisible(false)
    }

    // Jalali date onChange event
    const jalaliDateOnChange = (jDate: DayValue) => {
        const gregorianDate = jalaliMoment.from(`${jDate?.year}/${jDate?.month}/${jDate?.day}`, "fa", "YYYY/MM/DD").format("YYYY-MM-DD");
        const dateToMoment = moment(gregorianDate, "YYYY-MM-DD");
        setDate(jDate);
        setSchedulePopoverDate(dateToMoment)
    }

    // render regular HTML input element
    const renderCustomInput = (ref: any) => {
        const dateDay = date?.day;
        const dateMonth = date?.month;
        const dateYear = date?.year;

        const dateForInput = `${dateYear}/${dateMonth}/${dateDay}`;

        return (<Input className="schedule__persian-datepicker-input" readOnly ref={ref} placeholder="تاریخ" value={date ? dateForInput : ''} bordered={false} suffix={<CalendarOutlined style={{color: "rgba(0,0,0,0.25)"}}/>}/>)
    }

    // Publish status, Schedule popover contents
    const schedulePopoverContent = (currentLang: LanguageActionTypeEnum = LanguageActionTypeEnum.en) => (
        <div>
            {currentLang === LanguageActionTypeEnum.fa && (
                <PersianDatePicker
                    renderInput={({ref}) => renderCustomInput(ref)}
                    value={date}
                    onChange={jalaliDateOnChange}
                    shouldHighlightWeekends
                    locale={currentLang}
                    calendarPopperPosition="bottom"
                    calendarClassName="schedule__persian-datepicker"
                />
            )}
            {currentLang !== LanguageActionTypeEnum.fa && (
                <DatePicker defaultValue={schedulePopoverDate} allowClear={false} onChange={ScheduleDatePickerOnChange}
                            bordered={false}/>
            )}
            <TimePicker inputReadOnly defaultValue={schedulePopoverTime} allowClear={false} onChange={ScheduleTimePickerOnChange}
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
            }}>{isScheduled ? publishScheduledBtnTxt : t("collapse.status-and-visibility.content.publish.buttons.immediately")}</Button>
        </Popover>
    );
}

// Redux State To Map
const mapStateToProps = ({locale}: IStoreState): {lang: LanguageActionTypeEnum} => {
    return {lang: locale.lang}
}

// Redux Dispatch To Map
const mapDispatchToProps = {
    setPublishBtnTxt
}

export default connect(mapStateToProps, mapDispatchToProps)(SchedulePopover);