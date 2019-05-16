const GIPHY_LOADING_URL = 'http://www.ifmo.ru/images/loader.gif';
const styles = {
  minHeight: '310px',
  margin: '0.5em',
};

Gif = React.createClass({
  getUrl: function () {
    return this.props.sourceUrl || GIPHY_LOADING_URL;
  },
  render: function () {
    const url = this.props.loading ? GIPHY_LOADING_URL : this.props.url;
    return (
        <a style={styles} href={this.getUrl()} title='View this on giphy' target='new'>
          <img
            id='gif'
            src={url}
            style={
            {
            width: '100%',
            maxWidth: '350px'
          }} />
        </a>
    );
  },
});
