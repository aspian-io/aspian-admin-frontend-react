import React, {FC} from 'react';
import {Button, Result, Typography} from 'antd';
import {CloseCircleOutlined} from '@ant-design/icons';
import {history} from '../../../index';
import {v4 as uuidv4} from 'uuid';
import {useTranslation} from 'react-i18next';
import {IStoreState} from "../../../app/store/rootReducerTypes";
import {IResultPageStateType} from "../../../app/store/reducers/layout/result/resultPageReducerTypes";
import {connect} from "react-redux";

const {Paragraph, Text} = Typography;

interface IResultPageProps {
    resultPage: IResultPageStateType;
}

const ResultPage: FC<IResultPageProps> = ({resultPage}) => {
    const {t} = useTranslation('core_resultPage');

    const {
        status,
        title,
        subTitle,
        primaryBtnText,
        primaryBtnLink,
        ghostBtnText,
        ghostBtnLink,
        errorMsgList
    } = resultPage;

    return (
        <Result
            status={status}
            title={title}
            subTitle={subTitle}
            extra={[
                <Button
                    type="primary"
                    key={uuidv4()}
                    style={
                        primaryBtnText ? {display: 'inline-block'} : {display: 'none'}
                    }
                    onClick={() => history.push(primaryBtnLink)}
                >
                    {primaryBtnText}
                </Button>,
                <Button
                    key={uuidv4()}
                    style={
                        ghostBtnText ? {display: 'inline-block'} : {display: 'none'}
                    }
                    onClick={() => history.push(ghostBtnLink)}
                >
                    {ghostBtnText}
                </Button>,
            ]}
        >
            {errorMsgList.length > 0 && (
                <div className="desc">
                    <Paragraph key={uuidv4()}>
                        <Text
                            strong
                            style={{
                                fontSize: 16,
                            }}
                        >
                            {t('description')}
                        </Text>
                    </Paragraph>
                    {errorMsgList.map((msg, i) => {
                        return (
                            <Paragraph key={uuidv4()}>
                                <CloseCircleOutlined style={{color: 'red'}}/> {msg}
                            </Paragraph>
                        );
                    })}
                </div>
            )}
        </Result>
    );
};

// Redux State To Map
const mapStateToProps = ({resultPage}: IStoreState): { resultPage: IResultPageStateType } => {
    return {resultPage};
}

export default connect(
    mapStateToProps
)(ResultPage);
