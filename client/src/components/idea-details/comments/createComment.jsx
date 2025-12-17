import './createComment.css'
import { useContext, useEffect, useReducer } from 'react';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router';

import useForm from '../../../hooks/useForm';
import useRequest from '../../../hooks/useRequest';
import UserContext from '../../../contexts/UserContext';
import CommentItem from './commentItem.jsx/commentItem';
import Loading from '../../loading/Loading';

const BASE_URL = 'http://localhost:3030'

function reducer(state, action) {
    switch (action.type) {
        case 'ALL_IDEA_COMMENTS':
            return {
                ...state,
                comments: action.payload
            }
        case 'ALL_COMMENTS_COUNT':
            return {
                ...state,
                totalCount: action.payload.length
            }
        case 'ADD_COMMENT':
            return {
                ...state,
                comments: [...state.comments, action.payload],
                totalCount: state.totalCount + 1
            }
        case 'SET_LOADING':
            return {
                ...state,
                [action.payload.status]: action.payload.value
            }
        case 'NEXT_PAGE' : 
            return {
                ...state ,
                page : state.page + 1
            }
        case 'PREVIOUS_PAGE' : 
            return {
                ...state ,
                page : state.page - 1
            }
        default:
            return state
    }
}
const initialState = {
    comments: [],
    page: 1,
    totalCount: 0,
    deletingId: null,
    isCreating: false,
    IsLoading: false,
}
export default function CreateComment({ ideaId ,ideaOwner }) {

    const [items, dispatch] = useReducer(reducer, initialState)

    const { user , isAuthenticated} = useContext(UserContext)
    const navigate = useNavigate()
    const { request, isPending } = useRequest()
    const seachParm = encodeURIComponent(`ideaId="${ideaId}"`)
    const pageSize = 4
    const offset = (items.page - 1) * pageSize;
    const totalPage = Math.ceil((items.totalCount || 0) / pageSize)

    useEffect(() => {
        const controller = new AbortController();
            (async () => {
                try {
                    const result = await request(`${BASE_URL}/data/comments?where=${seachParm}`, 'GET', null, { signal: controller.signal });
                    dispatch({
                        type: "ALL_COMMENTS_COUNT",
                        payload: result
                    });

                } catch (err) {
                    if (err.name === "AbortError") {
                        return
                    }
                    toast.error('There was a problem with loading')
                }
            })();
        return () => {
            controller.abort()
        }
    }, [ideaId])

    useEffect(() => {
        const contr = new AbortController();
        dispatch({
            type: 'SET_LOADING',
            payload: {
                status: 'IsLoading',
                value: true
            }
        });
        (async () => {
            try {
                const result = await request(`${BASE_URL}/data/comments?where=${seachParm}&sortBy=_createdOn desc&offset=${offset}&pageSize=${pageSize}`, 'GET'.null, { signal: contr.signal });
                dispatch({
                    type: "ALL_IDEA_COMMENTS",
                    payload: result
                })
            } catch (err) {
                if (err.name === "AbortError") {
                    return
                }
                toast.error('There was a problem with loading')
            } finally {
                dispatch({
                    type: 'SET_LOADING',
                    payload: {
                        status: 'IsLoading',
                        value: false
                    }
                });
            }
        })();
        return () => {
            contr.abort()
        }
    }, [ideaId, items.page])
    const onCreateComment = async (currentComment) => {
        if (currentComment.content.length < 5) {
            return toast.error('The comment should be at least 5 characters', {
                autoClose: 1500
            })
        }
        const comentToSend = {
            content: currentComment.content,
            ideaId,
            email: user?.email
        }

        try {
            dispatch({
                type: 'SET_LOADING',
                payload: {
                    status: 'isCreating',
                    value: true
                }
            });
            const result = await request(`${BASE_URL}/data/comments`, 'POST', comentToSend, { accessToken: user.accessToken })
            dispatch({ type: 'ADD_COMMENT', payload: result });
            dispatch({
                type: 'SET_LOADING',
                payload: {
                    status: 'isCreating',
                    value: false
                }
            });
            data.content = ""
        } catch {
            toast.error('There was a problem with the comment creating')
        }
    }

    const { data, dataSetterHandler, formAction } = useForm(onCreateComment, {
        content: "",
    })

    if (items.IsLoading) {
        return <Loading />
    }

    return (
        <section className="create-comment">
            <h3 className="create-comment-title">Comments</h3>

            <ul className="comments-list">
                {items.comments?.map((coment) => <CommentItem key={coment._id} {...coment} />)}
            </ul>
             <div className="pagination  mt-10 flex items-center justify-center gap-6 ">
                <button
                    disabled={items.page <= 1}
                    onClick={() => dispatch({
                        type : "PREVIOUS_PAGE"
                    })}
                    className="
                        flex items-center gap-2
                        px-4 py-2
                        text-sm font-medium
                        bg-white text-gray-700
                        rounded-lg
                        shadow-sm
                        hover:bg-gray-100
                        disabled:opacity-40
                        disabled:cursor-not-allowed"
                >←</button>
                <span className="px-4 py-2
                        text-sm font-semibold
                        text-gray-700
                        bg-white/70
                        rounded-lg"
                >{items?.page} / {totalPage || 1}</span>
                <button
                    disabled={items.page >= totalPage}
                    onClick={() => dispatch({
                        type : "NEXT_PAGE"
                    })}
                     className="
                        text-sm font-medium
                        bg-white text-gray-700
                        hover:bg-gray-100
                        disabled:opacity-40
                        disabled:cursor-not-allowed"
                >→</button>
            </div>
            {isAuthenticated && user._id !== ideaOwner &&
            <form className="create-comment-form" action={formAction}>
                <textarea
                    className="comment-textarea"
                    name="content"
                    onChange={dataSetterHandler}
                    value={data.content}
                    placeholder="Write your comment here..."
                />

                <button disabled={isPending}
                    className="comment-submit-btn">
                    {items.isCreating ? "Creating" : "Create comment"}
                </button>
            </form>
            }
        </section>
    );
}