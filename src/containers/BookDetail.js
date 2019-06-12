import React from 'react';
import fetch from 'cross-fetch';
import {Link} from 'react-router-dom';
import Loading from '../components/Loading/Loading';
import {connect} from 'react-redux';
class BookDetail extends React.Component {
    // 会在组件挂载后（插入 DOM 树中）立即调用。依赖于 DOM 节点的初始化应该放在这里
    // 如需通过网络请求获取数据，此处是实例化请求的好地方。
    constructor (props) {
        super(props);
        this.state= {
            book: null,
            copys: [],
            pathname: props.location.pathname,
            isLoading: true
        }
    }
    componentWillMount () {
        console.log(this.props.location)
        let {dispatch} = this.props;
        if (!this.props.location.pathname) {
            dispatch(push('/books'));
        }
        let that = this;
        fetch(`http://localhost:3030${this.state.pathname}`)
            .then(response => response.json())
            .then(json => {
                that.setState(json)
                that.setState({
                    isLoading: false
                })
            })
    }
    render () {
        let {book, copys, isLoading} = this.state;
        return (
            <div>
                {
                    isLoading
                    ? (<Loading></Loading>)
                    : (
                        book && (
                        <div>
                            <h2>{book.title || ''}</h2>
                            <p>
                                <span>作者:</span>
                                <Link to={`/author/${book.author._id}`}>{`${book.author.family_name} ${book.author.first_name}`}</Link>
                            </p>
                            <p>
                                <span>摘要:</span><span>{book.summary}</span>
                            </p>
                            <p>
                                <span>ISBN:</span>
                                {book.ISBN}
                            </p>
                            <div>
                                <span>类别:</span>
                                <ul>
                                    {book.genre.map(item => (
                                        <li key={item._id}>
                                            <Link to={`/genre/${item._id}`}>{item.name}</Link>
                                        </li>
                                    ))}
                                </ul> 
                            </div>
                            <h3>藏本</h3>
                            {copys.length === 0
                            ? (<p>暂无任何藏本</p>) 
                            : (
                                <ul>
                                    {copys.map(copy => (
                                        <li key={copy._id}>
                                            <p>{copy.status}</p>
                                            <p>
                                                <span>Imprint:</span>
                                                {copy.imprint}
                                            </p>
                                            <p>
                                                <span>Id:</span>
                                                <Link to={`/copy/${copy._id}`}>{copy._id}</Link>
                                            </p>
                                        </li>
                                    ))}
                                </ul>
                            )}
                        </div>)
                    )
                }
            </div>
        )
    }
}
BookDetail = connect()(BookDetail);
export default BookDetail;