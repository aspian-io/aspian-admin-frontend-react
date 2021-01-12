import React from 'react';
import {UAParser} from "ua-parser-js";
import {IPost, ITaxonomyPost, PostStatusEnum} from "../../../app/models/post";
import {Link} from "react-router-dom";
import {ConvertDigitsToCurrentLanguage, e2p} from "../../../js-ts/base/NumberConverter";
import {CheckOutlined, CloseOutlined} from "@ant-design/icons";
import jalaliMoment from "jalali-moment";
import moment from "moment";
import {useTranslation} from "react-i18next";
import {IPostAntdTable} from "./types";
import {TaxonomyTypeEnum} from "../../../app/models/taxonomy";
import {LanguageActionTypeEnum} from "../../../app/store/actions";

const PostListDataSource = (lang: LanguageActionTypeEnum, posts: IPost[]): IPostAntdTable[] => {
    const {t} = useTranslation('core_postList');

    let data: IPostAntdTable[] = [];
    posts.forEach((post, i) => {
        const ua = new UAParser();
        ua.setUA(post.userAgent);

        /// PostStatus Localization:
        // Localized postStatus: to localize postStatus use "localizedPostStatus" variable as its value
        let localizedPostStatus: any;
        // Setting localized value for postStatus through the following switch statement
        switch (post.postStatus) {
            case PostStatusEnum.Publish:
                localizedPostStatus = t('table.filters.post-status.publish');
                break;
            case PostStatusEnum.Pending:
                localizedPostStatus = t('table.filters.post-status.pending');
                break;
            case PostStatusEnum.Inherit:
                localizedPostStatus = t('table.filters.post-status.inherit');
                break;
            case PostStatusEnum.AutoDraft:
                localizedPostStatus = t(
                    'table.filters.post-status.auto-draft'
                );
                break;
            case PostStatusEnum.Draft:
                localizedPostStatus = t('table.filters.post-status.draft');
                break;
            case PostStatusEnum.Future:
                localizedPostStatus = t('table.filters.post-status.future');
                break;
            default:
                localizedPostStatus = '';
                break;
        }

        // Initializing columns data
        data.push({
            key: post.id,
            title: (
                <Link to={`/admin/posts/details/${post.id}`}>
                    {ConvertDigitsToCurrentLanguage(
                        post.title,
                        LanguageActionTypeEnum.en,
                        lang
                    )}
                </Link>
            ),
            postCategory: post.taxonomyPosts.map((taxonomyPost: ITaxonomyPost) => {
                return taxonomyPost.taxonomy?.type === TaxonomyTypeEnum.category ? (
                    <div key={taxonomyPost.taxonomy.term.id}>
                        {ConvertDigitsToCurrentLanguage(
                            taxonomyPost.taxonomy.term.name,
                            LanguageActionTypeEnum.en,
                            lang
                        )}
                    </div>
                ) : (
                    ''
                );
            }),
            postStatus: localizedPostStatus,
            postAttachments: ConvertDigitsToCurrentLanguage(
                post.postAttachments.length,
                LanguageActionTypeEnum.en,
                lang
            ),
            commentAllowed: post.commentAllowed ? (
                <CheckOutlined style={{color: '#52c41a'}}/>
            ) : (
                <CloseOutlined style={{color: '#f5222d'}}/>
            ),
            viewCount: ConvertDigitsToCurrentLanguage(
                post.viewCount,
                LanguageActionTypeEnum.en,
                lang
            ),
            pinned: post.isPinned ? (
                <CheckOutlined style={{color: '#52c41a'}}/>
            ) : (
                <CloseOutlined style={{color: '#f5222d'}}/>
            ),
            comments: ConvertDigitsToCurrentLanguage(
                post.comments,
                LanguageActionTypeEnum.en,
                lang
            ),
            createdAt:
                lang === LanguageActionTypeEnum.fa
                    ? e2p(
                    jalaliMoment(post.createdAt, 'YYYY-MM-DD HH:mm:ss')
                        .locale('fa')
                        .format('YYYY-MM-DD HH:mm:ss')
                    )
                    : moment(post.createdAt).format('YYYY-MM-DD HH:mm:ss'),
            createdBy: post.createdBy?.userName,
            modifiedAt: post.modifiedAt
                ? lang === LanguageActionTypeEnum.fa
                    ? e2p(
                        jalaliMoment(post.modifiedAt, 'YYYY-MM-DD HH:mm:ss')
                            .locale('fa')
                            .format('YYYY-MM-DD HH:mm:ss')
                    )
                    : moment(post.modifiedAt).format('YYYY-MM-DD HH:mm:ss')
                : '',
            modifiedBy: post.modifiedBy?.userName,
            //userAgent: post.userAgent,
            device: ua.getDevice().type ?? 'Desktop',
            os: `${ua.getOS().name} ${ua.getOS().version}`,
            browser: `${ua.getBrowser().name} ${ua.getBrowser().version}`,
            userIPAddress: ConvertDigitsToCurrentLanguage(
                post.userIPAddress,
                LanguageActionTypeEnum.en,
                lang
            ),
        });
    });

    return (data);
}

export default PostListDataSource;