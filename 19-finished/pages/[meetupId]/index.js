import React from 'react';
import { MongoClient,ObjectId } from 'mongodb';
import MeetupDetail from '../../components/meetups/MeetupDetail';

const MeetupDetailPage = (props) => {
  return (
    <MeetupDetail 
      image={props.meetups.image}
      title={props.meetups.title}
      address={props.meetups.address}
      description={props.meetups.description}
    />
  );
};

export default MeetupDetailPage;

//  동적으로 경로를 설정할때 꼭 필요한 함수이다. 등록된 params.Id만 들어올 수 있다.
export const getStaticPaths = async () =>{
  const client = await MongoClient.connect('mongodb+srv://hoho3419:g6X3uIyAe3lq5iCj@cluster0.8ep2qxo.mongodb.net/meetups?retryWrites=true&w=majority');
  const db = client.db();
  const clientCollection = db.collection('meetups');
  const meetups = await clientCollection.find({},{_id: 1}).toArray();
  client.close();

  return {
    // false 를 입력하면 해당하는 id에 맞는것이 없으면 에러를 발생한다. true면 nextjs가 페이지를 만든다.
    fallback: true, 
    paths: meetups.map(meetup => ({
      params: { meetupId: meetup._id.toString() }
    }))
    // [
    //   {
    //     params:{
    //       meetupId: 'm1',
    //     }
    //   },
    //   {
    //     params:{
    //       meetupId: 'm2',
    //     }
    //   }
    // ]
  }
}

export const getStaticProps = async (context) =>{ 

  const meetupId = context.params.meetupId;
  // 빌드타임에 실행되기 때문에 브라우저에서 실행되지 않음
  const client = await MongoClient.connect('mongodb+srv://hoho3419:g6X3uIyAe3lq5iCj@cluster0.8ep2qxo.mongodb.net/meetups?retryWrites=true&w=majority');
  const db = client.db();
  const clientCollection = db.collection('meetups');
  const selectMeetup = await clientCollection.findOne({ _id: new ObjectId(meetupId)})
  client.close();

  return {
    props: {
      meetups: {
        id: selectMeetup._id.toString(),
        title: selectMeetup.title,
        image: selectMeetup.image,
        address: selectMeetup.address,
        description: selectMeetup.description
      },
    },
    // 데이터를 10초마다 다시 불러오게 하는 구문. 서버에 있는 데이터를 항상 최신 데이터만 받아오게 하는 방법  
    // revalidate: 10
  }
}