App = React.createClass({
  displayName: "App",

  getInitialState() {
    return {
      loading: false,
      searchingText: '',
      gif: {}
    };
  },

  handleSearch: function (searchingText) {
    this.setState({
      loading: true
    });
    this.getGif(searchingText).then(gif => {
      this.setState({
        loading: false,
        gif: gif,
        searchingText: searchingText
      });
    });
  },
  getGif: function (searchingText) {
    const GIPHY_API_URL = 'https://api.giphy.com';
    const GIPHY_PUB_KEY = 'JXwH9ImNM5zZIj2XZKgT6pX8tuNImvZ0';
    const url = `${GIPHY_API_URL}/v1/gifs/random?api_key=${GIPHY_PUB_KEY}&tag=${searchingText}`;
    return new Promise(function (resolve, reject) {
      const xhr = new XMLHttpRequest();

      xhr.onload = function () {
        if (xhr.status === 200) {
          let data = JSON.parse(xhr.responseText).data;
          let gif = {
            url: data.fixed_width_downsampled_url,
            sourceUrl: data.url
          };
          resolve(gif);
        } else {
          reject(new Error(this.statusText));
        }
      };

      xhr.open('GET', url);
      xhr.send();
    });
  },
  render: function () {
    const styles = {
      margin: '0 auto',
      textAlign: 'center',
      width: '90%'
    };
    return React.createElement("div", {
      style: styles
    }, React.createElement("h1", null, "Wyszukiwarka GIF\xF3w!"), React.createElement("p", null, "Znajd\u017A gifa na ", React.createElement("a", {
      href: "http://giphy.com"
    }, "giphy"), ". Naciskaj enter, aby pobra\u0107 kolejne gify."), React.createElement(Search, {
      onSearch: this.handleSearch
    }), React.createElement(Gif, {
      loading: this.state.loading,
      url: this.state.gif.url,
      sourceUrl: this.state.gif.sourceUrl
    }));
  }
});