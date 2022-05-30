import React, { useState, useEffect, withStyles } from "react";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import CardMedia from "@mui/material/CardMedia";
import _ from "lodash";
import Lightbox from "react-image-lightbox";
import "react-image-lightbox/style.css";

const images = [
  "//placekitten.com/1500/500",
  "//placekitten.com/4000/3000",
  "//placekitten.com/800/1200",
  "//placekitten.com/1500/1500"
];

const Detail = (props) => {
  const [lightbox, setLightbox] = useState({
    isOpen: false,
    photoIndex: 0
  });

  return (
    <Container maxWidth="md">
      <Typography variant="body2" variant="h6" color="text.secondary">
        Name
      </Typography>
      <Typography variant="body2" color="text.secondary">
        Something short
      </Typography>

      <Typography variant="body2" variant="h6" color="text.secondary">
        Tel
      </Typography>
      <Typography variant="body2" color="text.secondary">
        0988264820
      </Typography>
      <Typography variant="body2" variant="h6" color="text.secondary">
        Detail
      </Typography>
      <Typography variant="body2" color="text.secondary">
        Something short and leading about the collection below—its contents, the
        creator, etc. Make it short and sweet, but not too short so folks
        don&apos;t simply skip over it entirely.
      </Typography>

      <Container sx={{ py: 2 }} maxWidth="md">
        <Grid container spacing={4} alignItems="center">
          {_.map([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13], (value, key) => (
            <Grid item>
              <CardMedia
                component="img"
                height="150"
                width="150"
                image="https://png.pngtree.com/element_our/20190531/ourlarge/pngtree-cartoon-cute-hamster-png-transparent-bottom-image_1305367.jpg"
                alt="Paella dish"
                onClick={() => {
                  setLightbox({ isOpen: true, photoIndex: 0 });
                }}
              />
            </Grid>
          ))}
        </Grid>

        {lightbox.isOpen && (
          <Lightbox
            mainSrc={images[lightbox.photoIndex]}
            nextSrc={images[(lightbox.photoIndex + 1) % images.length]}
            prevSrc={
              images[(lightbox.photoIndex + images.length - 1) % images.length]
            }
            onCloseRequest={() => {
              // this.setState({ isOpen: false });
              setLightbox({ ...lightbox, isOpen: false });
            }}
            onMovePrevRequest={() =>
              // this.setState({
              //   photoIndex:
              //     (lightbox.photoIndex + images.length - 1) % images.length
              // })
              {
                setLightbox({
                  ...lightbox,
                  photoIndex:
                    (lightbox.photoIndex + images.length - 1) % images.length
                });
              }
            }
            onMoveNextRequest={() =>
              // this.setState({
              //   photoIndex: (lightbox.photoIndex + 1) % images.length
              // })
              {
                setLightbox({
                  ...lightbox,
                  photoIndex: (lightbox.photoIndex + 1) % images.length
                });
              }
            }
          />
        )}
      </Container>
    </Container>
  );
};

export default Detail;
