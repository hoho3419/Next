import MeetupList from "../components/meetups/MeetupList";
import { MongoClient } from 'mongodb'
import Head from 'next/head';
/** 
let DUMMY_DATA = [
  {
    id: 'm1',
    title: '강아지',
    image: 'https://dimg.donga.com/wps/NEWS/IMAGE/2022/01/28/111500268.2.jpg',
    address: '어딘가에 살겠지',
    description: '강아지 입니다.'
  },
  {
    id: 'm2',
    title: '개',
    image: 'https://dimg.donga.com/wps/NEWS/IMAGE/2022/01/28/111500268.2.jpg',
    address: '아무데나 살겠지',
    description: '개 입니다.'
  }
]
*/

const HomePage = (props) => {
  return (
    <>
    <Head>
      <title>React Meetup</title>
      <meta name="description" content="리액트 meetup 페이지 입니다."></meta>
    </Head>
    <MeetupList meetups={props.meetups}/>
    </>
  );
};

export default HomePage;

// 사전 렌더링으로 컴포넌트가 실행되기 전에 실행되는 구문
// 데이터베이스 연결이나 데이터를 받아오는 역할을 하면 됨. 대부분 인증할때 사용하
// *** 처음 코드들 빌드하고 딱 한번만 실행하기 때문에 더이상 실행을 하지 않는다. 
export const getStaticProps = async () =>{ 
  // 디비랑 연결하기
  const client = await MongoClient.connect('mongodb+srv://hoho3419:g6X3uIyAe3lq5iCj@cluster0.8ep2qxo.mongodb.net/meetups?retryWrites=true&w=majority');
  //  DB 객체 만들기
  const db = client.db();
  // meetups 컬렉션 컬럼 가져오가
  const meetupsCollection = db.collection('meetups');
  // meetups 컬렉션 테이블 안에 있는 데이터들 find로 전부 가져오고 toArray로 배열로 변경하기
  const meetups = await meetupsCollection.find().toArray();

  client.close();
  return {
    props: {
      meetups: meetups.map(meetups => ({
        title: meetups.title,
        image: meetups.image,
        description: meetups.description,
        id: meetups._id.toString()
      })),
    },
    // 데이터를 10초마다 다시 불러오게 하는 구문. 서버에 있는 데이터를 항상 최신 데이터만 받아오게 하는 방법  
    revalidate: 10
  }
}

// 서버에서 실행하는 구문
// export const getServerSideProps = async (context) =>{
//   // 이 페이지로 들어올때 요청받은 데이터
//   const req = context.req;
//   // 다시 컴포넌트에 전달될 데이터
//   const res = context.res;
//   return {
//     props:{
//       meetups: DUMMY_DATA,
//     }
//   }
// }