import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import LayoutPage from "../components/layout";
import { getDataFilmById } from "../services/api";
import LoadingData from "../components/loading";
import { Card, Col, Row } from "antd";

const { Meta } = Card;

const DetailMoviePage = () => {
    const { id } = useParams();
    const [loadingDetail, setLoadingDetail] = useState(false);
    const [detailMovie, setDetailMovie] = useState({});
    const [videoUrl, setVideoUrl] = useState("");

    useEffect(() => {
        const getDataMovie = async () => {
            setLoadingDetail(true);
            const data = await getDataFilmById(id);

            console.log(data);

            if (data) {
                setDetailMovie(data);
                if (data.videos.results[0]) {
                    setVideoUrl(
                        `https://www.youtube.com/embed/${data.videos.results[0].key}`
                    );
                }
                setLoadingDetail(false);
            }
        };

        getDataMovie();
    }, [id]);

    if (
        loadingDetail &&
        Object.keys(detailMovie).length === 0 &&
        detailMovie.constructor === Object
    ) {
        <LayoutPage>
            <LoadingData />
        </LayoutPage>;
    }
    return (
        <LayoutPage>
            <Row>
                <Col span={6} key="234">
                    <Card
                        hoverable
                        // style={{
                        //     width: 200,
                        //     marginRight: "5px",
                        //     marginBottom: "10px",
                        // }}
                        cover={
                            <img
                                alt={detailMovie.original_title}
                                src={`https://image.tmdb.org/t/p/w400/${detailMovie.poster_path}`}
                            />
                        }
                    >
                        <Meta title={detailMovie.original_title}></Meta>
                    </Card>
                </Col>
                <Col span={12} key="23" style={{ paddingLeft: "20px" }}>
                    <Row>
                        <Col span={24} key="657">
                            <h1>{detailMovie.title}</h1>
                            <p style={{ width: "600px" }}>
                                {detailMovie.overview}
                            </p>
                            {detailMovie.genres && (
                                <p>
                                    Thể loại:
                                    {detailMovie.genres.map((item) => (
                                        <span
                                            style={{
                                                color: "green",
                                                marginLeft: "10px",
                                            }}
                                        >
                                            {item.name}
                                        </span>
                                    ))}
                                </p>
                            )}
                            <p>
                                Điểm trung bình:{" "}
                                <span
                                    style={{ color: "red", fontWeight: "bold" }}
                                >
                                    {detailMovie.vote_average}
                                </span>
                            </p>
                            <p>
                                Lượt vote:{" "}
                                <span
                                    style={{ color: "red", fontWeight: "bold" }}
                                >
                                    {detailMovie.vote_count}
                                </span>
                            </p>
                            {videoUrl ? (
                                <iframe
                                    width="560"
                                    height="315"
                                    src={videoUrl}
                                    title="YouTube video player"
                                    frameBorder="0"
                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                ></iframe>
                            ) : (
                                <p style={{ fontWeight: "bold" }}>
                                    Phim chưa có trailer
                                </p>
                            )}
                        </Col>
                    </Row>
                </Col>
                <Col span={6} key="5">
                    <Row>
                        <Col span={24} key="2">
                            {detailMovie.images &&
                                (detailMovie.images.backdrops ? (
                                    <h2>
                                        Hình ảnh
                                        {detailMovie.images.backdrops.map(
                                            (item) => (
                                                <Card
                                                    hoverable
                                                    cover={
                                                        <img
                                                            alt="poster-film"
                                                            src={`https://image.tmdb.org/t/p/w400/${item.file_path}`}
                                                        />
                                                    }
                                                ></Card>
                                            )
                                        )}
                                    </h2>
                                ) : null)}
                        </Col>
                    </Row>
                </Col>
            </Row>
        </LayoutPage>
    );
};

export default React.memo(DetailMoviePage);
