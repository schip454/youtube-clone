import { AiFillHome, AiOutlineFlag } from 'react-icons/ai';
import { MdLocalFireDepartment, MdLiveTv } from 'react-icons/md';
import { CgMusicNote } from 'react-icons/cg';
import { FiFilm } from 'react-icons/fi';
import { IoGameControllerSharp } from 'react-icons/io5';
import { ImNewspaper } from 'react-icons/im';
import { GiDiamondTrophy, GiEclipse } from 'react-icons/gi';
import { RiLightbulbLine, RiFeedbackLine } from 'react-icons/ri';
import { FiSettings, FiHelpCircle } from 'react-icons/fi';
import { SiYoutubeshorts } from "react-icons/si";

export const categories = [
  { name: 'now', icon: AiFillHome, type: 'home' },
  { name: 'music', icon: CgMusicNote, type: 'category' },
  { name: 'movies', icon: FiFilm, type: 'category' },
  {
    name: 'games',
    icon: IoGameControllerSharp,
    type: 'category',
    divider: true,
  },
  // {
  //   name: 'Shorts',
  //   icon: <SiYoutubeshorts />,
  //   type: 'shorts',
  //   divider: true,

  // },
  { name: 'Settings', icon: FiSettings, type: 'menu' },
  { name: 'Report History', icon: AiOutlineFlag, type: 'menu' },
  { name: 'Help', icon: FiHelpCircle, type: 'menu' },
  { name: 'Send feedback', icon: RiFeedbackLine, type: 'menu' },
];


export const orderList = [
  {
    query: 'hour',
    title: 'Last hour',
    filterType: 'upload_date'
  },
  {
    query: 'today',
    title: 'Today',
    filterType: 'upload_date'
  },
  {
    query: 'week',
    title: 'Last week',
    filterType: 'upload_date'
  },
  {
    query: 'month',
    title: 'Last month',
    filterType: 'upload_date'
  },
  {
    query: 'year',
    title: 'Last year',
    filterType: 'upload_date'
  },
];

export const sortList = [
  {
    query: 'relevance',
    title: 'Relevance',
    filterType: 'sort_by'
  },
  {
    query: 'rating',
    title: 'Rating',
    filterType: 'sort_by'
  },
  {
    query: 'date',
    title: 'Date',
    filterType: 'sort_by'
  },
  {
    query: 'views',
    title: 'Views',
    filterType: 'sort_by'
  },
]

export const featuresList = [
  {
    query: 'HD',
    title: 'HD',
    filterType: 'features'
  },
  {
    query: 'subtitles',
    title: 'Subtitles',
    filterType: 'features'
  },
  {
    query: 'CCommons',
    title: 'Creative Commons License',
    filterType: 'features'
  },
  {
    query: '3D',
    title: '3D',
    filterType: 'features'
  },
  {
    query: 'Live',
    title: 'Live',
    filterType: 'features'
  },
  {
    query: 'Purchased',
    title: 'Purchased',
    filterType: 'features'
  },
  {
    query: '4K',
    title: '4K',
    filterType: 'features'
  },
  {
    query: '360',
    title: '360',
    filterType: 'features'
  },
  {
    query: 'Location',
    title: 'Location',
    filterType: 'features'
  },
  {
    query: 'HDR',
    title: 'HDR',
    filterType: 'features'
  },
  {
    query: 'VR180',
    title: 'VR180',
    filterType: 'features'
  },
]

export const durationList = [
  {
    query: 'short',
    title: 'less than 4 min',
    filterType: 'duration'
  },
  {
    query: 'medium',
    title: '4 to 20 min',
    filterType: 'duration'
  },
  {
    query: 'long',
    title: 'more than 20 min',
    filterType: 'duration'
  },
]

export const typeList = [
  {
    query: 'video',
    title: 'Video',
    filterType: 'type'

  },
  {
    query: 'channel',
    title: 'Channel',
    filterType: 'type'

  },
  {
    query: 'playlist',
    title: 'Playlist',
    filterType: 'type'

  },
  {
    query: 'movie',
    title: 'Movie',
    filterType: 'type'

  },
  {
    query: 'show',
    title: 'Show',
    filterType: 'type'

  },
]

export const sortCommentsList = [
  {
    query: 'newest',
    title: 'Newest',
  },
  {
    query: 'top',
    title: 'Top',
  },
]







