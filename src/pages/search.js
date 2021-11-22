import React, { useState } from "react";
import { Card, Col, Input, Pagination, Row } from "antd";
import LayoutPage from "../components/layout";
import { searchMovieByKeyword } from "../services/api";
import LoadingData from "../components/loading";
import { Link } from "react-router-dom";
import slugify from "react-slugify";

const { Search } = Input;
const { Meta } = Card;

const SearchPage = () => {
    const [loadingSearch, setLoadingSearch] = useState(false);
    const [listMovie, setListMovie] = useState([]);
    const [page, setPage] = useState(1);
    const [totalItems, setTotalItems] = useState(0);
    const [key, setKey] = useState("");

    const getDataMovie = async (keyword = "", currentPage = 1) => {
        setLoadingSearch(true);
        setPage(currentPage);
        const data = await searchMovieByKeyword(keyword, currentPage);
        if (data) {
            setListMovie(data.results);
            setTotalItems(data.total_results);
            setKey(keyword);
            if (page < 1) {
                setPage(1);
            } else if (page > data.total_pages && data.total_pages !== 0) {
                setPage(data.total_pages);
            }
            setLoadingSearch(false);
        }
    };

    if (loadingSearch && listMovie.length === 0) {
        return (
            <LayoutPage>
                <LoadingData />
            </LayoutPage>
        );
    }

    return (
        <LayoutPage>
            <Row style={{ marginBottom: "20px" }}>
                <Col span={12} offset={6}>
                    <Search
                        placeholder="Nhập từ khóa..."
                        onSearch={(val) => getDataMovie(val, page)}
                        enterButton
                        allowClear
                    ></Search>
                </Col>
            </Row>
            {key && <h1>Từ khóa tìm kiếm: {key}</h1>}
            <Row style={{ marginTop: "5px" }}>
                {listMovie.map((item, index) => (
                    <Col span={4} key={index}>
                        <Link to={`/movie/${slugify(item.title)}~${item.id}`}>
                            <Card
                                hoverable
                                style={{
                                    width: 200,
                                    marginRight: "5px",
                                    marginBottom: "10px",
                                }}
                                cover={
                                    <img
                                        alt={item.title}
                                        src={`https://image.tmdb.org/t/p/w200/${item.poster_path}`}
                                    />
                                }
                            >
                                <Meta
                                    title={item.title}
                                    // description={item.overview}
                                />
                            </Card>
                        </Link>
                    </Col>
                ))}
            </Row>
            {totalItems !== 0 && (
                <Row style={{ textAlign: "center", marginTop: "20px" }}>
                    <Col span={24}>
                        <Pagination
                            current={page}
                            pageSize={20}
                            total={totalItems}
                            onChange={(page) => getDataMovie(key, page)}
                        />
                    </Col>
                </Row>
            )}
        </LayoutPage>
    );
};

export default React.memo(SearchPage);
