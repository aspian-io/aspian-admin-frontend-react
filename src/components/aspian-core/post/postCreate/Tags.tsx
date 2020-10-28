import React, {Fragment, useEffect, useState} from "react";
import {Input, Tag} from 'antd';
import {TweenOneGroup} from 'rc-tween-one';
import {PlusOutlined} from '@ant-design/icons';
import {useTranslation} from "react-i18next";

const Tags = () => {
    const { t } = useTranslation('core_postCreate');
    // States
    const [tags, setTags] = useState(['Tag 1', 'Tag 2', 'Tag 3']);
    const [inputVisible, setInputVisible] = useState(false);
    const [inputValue, setInputValue] = useState('');
    const [input, setInput] = useState<Input | null>(null);

    useEffect(() => {
        if (inputVisible && input) input!.focus();
    }, [inputVisible, input])

    const handleClose = (removedTag: any) => {
        const result = tags.filter(tag => tag !== removedTag);
        console.log(result);
        setTags(result);
    };

    const showInput = () => {
        setInputVisible(true)
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setInputValue(e.target.value);
    };

    const handleInputConfirm = () => {
        let allTags = tags;
        if (inputValue && tags.indexOf(inputValue) === -1) {
            allTags = [...tags, inputValue];
        }
        console.log(allTags);
        setTags(allTags);
        setInputVisible(false);
        setInputValue('');
    };

    const forMap = (tag: any) => {
        const tagElem = (
            <Tag
                closable
                onClose={(e: any) => {
                    e.preventDefault();
                    handleClose(tag);
                }}
            >
                {tag}
            </Tag>
        );
        return (
            <span key={tag} style={{display: 'inline-block', marginBottom: "6px"}}>
        {tagElem}
      </span>
        );
    };

    const saveInputRef = (input: Input | null) => {
        setInput(input)
    };

    const tagChild = tags.map(forMap);

    return (
        <Fragment>
            <div style={{marginBottom: 16}}>
                <TweenOneGroup
                    enter={{
                        scale: 0.8,
                        opacity: 0,
                        type: 'from',
                        duration: 100,
                    }}
                    leave={{opacity: 0, width: 0, scale: 0, duration: 200}}
                    appear={false}
                >
                    {tagChild}
                </TweenOneGroup>
            </div>
            {inputVisible && (
                <Input
                    ref={saveInputRef}
                    type="text"
                    size="small"
                    style={{width: 78}}
                    value={inputValue}
                    onChange={handleInputChange}
                    onBlur={handleInputConfirm}
                    onPressEnter={handleInputConfirm}
                />
            )}
            {!inputVisible && (
                <Tag color="processing" onClick={showInput} style={{background: "#fff", borderStyle: "dashed"}}>
                    <PlusOutlined/> {t("collapse.tags.button")}
                </Tag>
            )}
        </Fragment>
    );
}

export default Tags;