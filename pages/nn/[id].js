import Head from "next/head";
import styles from "../../styles/Home.module.css";
import { getPictures } from "../../lib/cos";

export async function getServerSideProps({ params }) {
  return await getPictures({ Prefix: params.id + "/" });
}

export default function Pictures(props) {
  console.log(props);
  const { buketList } = props;
  return (
    <div className={styles.container}>
      <Head>
        <title>暖暖的世界</title>
        <meta name="description" content="暖暖的世界" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1>暖暖的世界</h1>
        <div>
          {buketList.map((item) => {
            const domain = "https://damaris-1251491013.file.myqcloud.com/";
            const query =
              "?imageMogr2/thumbnail/400x/format/webp/interlace/0/quality/100";
            const url = `${domain}${item.Key}${query}`;
            const isVideo = item.Key.includes(".MOV");
            const videoUrl = `${domain}${item.Key}`;
            return (
              <div key={item.Key} href={`#`}>
                <h6>{item.Key}</h6>
                <p>{isVideo ? <video src={videoUrl} /> : <img src={url} />}</p>
              </div>
            );
          })}
        </div>
      </main>
    </div>
  );
}
