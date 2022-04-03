import COS from "cos-nodejs-sdk-v5";

const cos = new COS({
  SecretId: process.env.CosSecretId,
  SecretKey: process.env.CosSecretKey,
});

export const getPictureCategory = async () => {
  const buketList = await new Promise((resolve, reject) => {
    cos.getBucket(
      {
        Bucket: "damaris-1251491013" /* 填入您自己的存储桶，必须字段 */,
        Region: "ap-beijing" /* 存储桶所在地域，例如ap-beijing，必须字段 */,
        Delimiter: "/",
      },
      (err, data) => {
        if (err) {
          return reject(err);
        }
        resolve(data);
      }
    );
  });

  // console.log("buketList", buketList);

  return {
    props: { buketList: buketList.CommonPrefixes },
  };
};

export const getPictures = async ({ Prefix } = { Prefix: "/" }) => {
  console.log("Prefix", Prefix);
  const buketList = await new Promise((resolve, reject) => {
    cos.getBucket(
      {
        Bucket: "damaris-1251491013" /* 填入您自己的存储桶，必须字段 */,
        Region: "ap-beijing" /* 存储桶所在地域，例如ap-beijing，必须字段 */,
        Prefix,
        Delimiter: "/",
      },
      (err, data) => {
        if (err) {
          return reject(err);
        }
        resolve(data);
      }
    );
  });

  // console.log("buketList", buketList);

  return {
    props: { buketList: buketList.Contents.slice(1) },
  };
};
