import React, {FC, Fragment, useState} from "react";
import {Alert, Button, Col, Form, Input, message, Row, Spin, TreeSelect} from "antd";
import {useTranslation} from "react-i18next";
import {Taxonomy, TaxonomyTypeEnum, Term} from "../../../app/models/taxonomy";
import slugify from "slugify";
import {v4} from "uuid";
import {ITaxonomyStateType} from "../../../app/store/reducers/taxonomy/taxonomyReducerTypes";
import {connect} from "react-redux";
import {IStoreState} from "../../../app/store/rootReducerTypes";
import {
    createCategory,
    loadAntdTreeSelectCompatibleCategories,
    setCategoryTreeSelectChosenValues,
} from "../../../app/store/actions";
import {IPostInitFormValues} from "../../../app/models/post";

export interface ITreeData {
    title: string;
    value: string;
    key: string;
    children: ITreeData[];
}

interface ICategoryProps {
    taxonomy: ITaxonomyStateType;
    createCategory: Function;
    loadAntdTreeSelectCompatibleCategories: Function;
    setCategoryTreeSelectChosenValues: typeof setCategoryTreeSelectChosenValues;
    postInitFormValues: IPostInitFormValues;
}

const Categories: FC<ICategoryProps> = ({
                                            taxonomy,
                                            createCategory,
                                            loadAntdTreeSelectCompatibleCategories,
                                            setCategoryTreeSelectChosenValues,
                                            postInitFormValues
                                        }) => {
    const {t} = useTranslation('core_postCreate');
    const {loadingInitial, catsTreeSelect, catTreeSelectLoading} = taxonomy;
    const [errorMsg, setErrorMsg] = useState<string | null>(null);
    const [isAddNewCategoryBtnDisabled, setIsAddNewCategoryBtnDisabled] = useState(true);
    const [newCatParentTreeSelectVal, setNewCatParentTreeSelectVal] = useState<any>(undefined);

    // Parent Category Tree Select clear handler
    const clearSelectedNewCatParentTreeSelect = () => {
        setNewCatParentTreeSelectVal(undefined);
    }

    // States
    const [showAddCategoryForm, setShowAddCategoryForm] = useState(false);

    //
    const [addNewCatForm] = Form.useForm();

    ///
    return (
        <Fragment>
            <Row style={{marginTop: "20px"}}>
                <Col span={24}>
                    <TreeSelect
                        loading={catTreeSelectLoading}
                        value={postInitFormValues.selectedCategories}
                        style={{width: '100%', fontSize: "12px"}}
                        dropdownStyle={{maxHeight: 400, overflow: 'auto'}}
                        treeData={catsTreeSelect}
                        placeholder={t("collapse.categories.content.category-tree-select.placeholder")}
                        treeCheckable={true}
                        showArrow={true}
                        showSearch={true}
                        filterTreeNode={true}
                        treeNodeFilterProp="title"
                        treeCheckStrictly={true}
                        onDropdownVisibleChange={(open) => {
                            if (open && catsTreeSelect.length === 0) {
                                loadAntdTreeSelectCompatibleCategories()
                            }
                        }}
                        onChange={(selectedCategories: { value: string, label: string }[], node) => {
                            setCategoryTreeSelectChosenValues(selectedCategories);
                        }}
                    />
                </Col>
            </Row>
            <Row style={{marginTop: "20px"}}>
                <Button type="link" style={{fontSize: "12px", padding: "0"}}
                        onClick={() => setShowAddCategoryForm(!showAddCategoryForm)}>
                    {t("collapse.categories.content.add-new-category.name")}
                </Button>
            </Row>
            <Row style={showAddCategoryForm ? {display: "block", marginTop: "20px"} : {display: "none"}}>
                <Col span={24}>
                    <Spin spinning={loadingInitial}>
                        {errorMsg && <Fragment><Alert message={errorMsg} type="error" showIcon/><br/></Fragment>}

                        <Form form={addNewCatForm} id="addNewCategoryForm" onFinish={(value) => {

                            const taxonomy = new Taxonomy({
                                id: v4(),
                                type: TaxonomyTypeEnum.category,
                                parentId: (document.getElementById("newCategoryParentId") as HTMLInputElement).value ?
                                    (document.getElementById("newCategoryParentId") as HTMLInputElement).value :
                                    null,
                                term: new Term({
                                    id: v4(),
                                    name: value.newCategoryName,
                                    slug: slugify(value.newCategoryName)
                                })
                            });

                            createCategory(taxonomy)
                                .then(() => {
                                    addNewCatForm.resetFields();
                                    setErrorMsg(null);
                                    clearSelectedNewCatParentTreeSelect();
                                    setIsAddNewCategoryBtnDisabled(true)
                                    message.success(t("collapse.categories.content.add-new-category.adding-success_message"));
                                })
                                .catch((error: any) => {
                                    if (error.data.errors.TermName || error.data.errors.TermSlug) {
                                        setErrorMsg(t("collapse.categories.content.add-new-category.adding-error-messages.term-name-error"));
                                    } else {
                                        setErrorMsg(t("collapse.categories.content.add-new-category.adding-error-messages.else-error"));
                                    }
                                    message.error(t("collapse.categories.content.add-new-category.adding-error-messages.antd-message-error"));
                                })
                        }
                        }>
                            <Form.Item
                                className="post-category__new-cat-name"
                                name="newCategoryName"
                                rules={[{required: true, message: 'Please input category name!'}]}
                                style={{fontSize: "12px"}}
                                id="newCategoryName"
                            >
                                <Input type="text"
                                       onChange={(e) => e.target.value.length ?
                                           setIsAddNewCategoryBtnDisabled(false) :
                                           setIsAddNewCategoryBtnDisabled(true)}
                                       placeholder={t("collapse.categories.content.add-new-category.category-name-input.placeholder")}
                                       className="add-new__add-new-cat--input"/>
                            </Form.Item>
                            <Form.Item>
                                <Input type="hidden" id="newCategoryParentId" value={newCatParentTreeSelectVal}/>
                                <TreeSelect
                                    value={newCatParentTreeSelectVal}
                                    loading={catTreeSelectLoading}
                                    style={{width: '100%', fontSize: "12px"}}
                                    dropdownStyle={{maxHeight: 400, overflow: 'auto'}}
                                    treeData={catsTreeSelect}
                                    placeholder={t("collapse.categories.content.add-new-category.category-parent-select.placeholder")}
                                    showSearch={true}
                                    allowClear
                                    filterTreeNode={true}
                                    treeNodeFilterProp="title"
                                    multiple={false}
                                    onDropdownVisibleChange={(open) => {
                                        if (open && catsTreeSelect.length === 0) {
                                            loadAntdTreeSelectCompatibleCategories()
                                        }
                                    }}
                                    onChange={(value) => {
                                        setNewCatParentTreeSelectVal(value);
                                    }
                                    }
                                />
                            </Form.Item>
                            <Form.Item>
                                <Button type="primary" htmlType="submit" style={{fontSize: "12px"}}
                                        disabled={isAddNewCategoryBtnDisabled}>
                                    {t("collapse.categories.button")}
                                </Button>
                            </Form.Item>
                        </Form>
                    </Spin>
                </Col>
            </Row>
        </Fragment>
    );
}

// Redux State To Map
const mapStateToProps = ({taxonomy, post}: IStoreState): { taxonomy: ITaxonomyStateType, postInitFormValues: IPostInitFormValues } => {
    return {taxonomy, postInitFormValues: post.postInitFormValues};
}

// Redux Dispatch To Map
const mapDispatchToProps = {
    createCategory,
    loadAntdTreeSelectCompatibleCategories,
    setCategoryTreeSelectChosenValues,
}

export default connect(mapStateToProps, mapDispatchToProps)(Categories);