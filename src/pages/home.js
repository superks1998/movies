import React, { useEffect, useState } from "react";
import { Card, Col, Pagination, Row } from "antd";
import { Link } from "react-router-dom";
import slugify from "react-slugify";
import LayoutPage from "../components/layout";
import { getDataMoviesHomePage } from "../services/api";
import LoadingData from "../components/loading";

const { Meta } = Card;

const HomePage = () => {
    const [loadingHome, setLoadingHome] = useState(false);
    const [listMovie, setListMovie] = useState([]);
    const [page, setPage] = useState(1);
    const [totalResult, setTotalResult] = useState(0);

    useEffect(() => {
        const getDataMovies = async () => {
            setLoadingHome(true);

            const data = await getDataMoviesHomePage(page);

            if (data) {
                setListMovie(data.results);
                setTotalResult(data.total_results);
                if (page < 1) {
                    setPage(1);
                } else if (page > data.total_pages) {
                    setPage(data.total_pages);
                }
                setLoadingHome(false);
            }
        };

        getDataMovies();
    }, [page]);

    const changePage = (page) => {
        setPage(page);
    };

    if (loadingHome && listMovie.length === 0) {
        return (
            <LayoutPage>
                <LoadingData />
            </LayoutPage>
        );
    }

    return (
        <LayoutPage>
            <h1>This is home page</h1>
            <Row style={{ marginTop: "5px" }}>
                {listMovie.map((item, index) => (
                    <Col span={4} key={item.title}>
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
                                <Meta title={item.title} />
                            </Card>
                        </Link>
                    </Col>
                ))}
            </Row>
            <Row style={{ textAlign: "center", marginTop: "20px" }}>
                <Col span={24}>
                    <Pagination
                        current={page}
                        pageSize={20}
                        total={totalResult}
                        onChange={changePage}
                    />
                </Col>
            </Row>
        </LayoutPage>
    );
};

export default React.memo(HomePage);
