import axios from 'axios'

export default axios.create({ //all axios can be used, shown in axios documentation
  baseURL: 'https://www.reddit.com/',
})
