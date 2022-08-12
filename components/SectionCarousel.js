import Carousel, { Pagination } from 'react-native-snap-carousel';
import { View } from 'react-native';
import { useRef, useState } from 'react';
import CarouselCardItem, {
  SLIDER_WIDTH,
  ITEM_WIDTH,
} from './SectionCarouselItem';

export default function SectionCarousel(props) {
  const isCarousel = useRef(null);
  const [index, setIndex] = useState(0);

  return (
    <View>
      <Carousel
        layout='default'
        ref={isCarousel}
        renderItem={CarouselCardItem}
        sliderWidth={SLIDER_WIDTH}
        itemWidth={ITEM_WIDTH}
        inactiveSlideShift={0}
        useScrollView={true}
        onSnapToItem={(index) => setIndex(index)}
        {...props}
      />
      <Pagination
        dotsLength={props.data.length}
        activeDotIndex={index}
        carouselRef={isCarousel}
        dotStyle={{
          width: 10,
          height: 10,
          borderRadius: 5,
          marginHorizontal: 0,
          backgroundColor: 'rgba(0, 0, 0, 0.92)',
        }}
        inactiveDotOpacity={0.4}
        inactiveDotScale={0.6}
        tappableDots={true}
      />
    </View>
  );
}
