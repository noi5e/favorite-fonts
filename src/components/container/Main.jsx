import React from 'react';
import { connect } from 'react-redux';
import { fetchFonts } from '../../redux/actions';

import FontCard from '../presentational/FontCard.jsx';

const Main = ({ fonts, fetchFonts }) => {

  // const [fonts, setFonts] = useState([]);

  // useEffect(() => {
  //   const fetchFonts = async() => {
  //     const result = await axios('/api/get_all_fonts');
  //     setFonts(result.data.slice(0, 8));
  //   }

  //   fetchFonts();
  // }, []);

  fetchFonts();

  const fontCards = fonts ? (
    fonts.map((font, index) => (
      <FontCard key={index} fontName={font.family} author={'Christian Robertson'} sampleText={'The quick brown fox jumped over the lazy dog.'} />
    ))
  ) : (
    "Loading..."
  );

  return (
    <div id="font-card-container">
      {fontCards}
    </div>
  );
}

const mapStateToProps = state => ({
  fonts: state.fonts
});

// const mapDispatchToProps = dispatch => ({
//   getAllFonts: () => {
//     dispatch(fetchFonts())
//   }
// });

const mapDispatchToProps = { fetchFonts };

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Main);
