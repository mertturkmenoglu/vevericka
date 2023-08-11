import { faker } from "@faker-js/faker";
import { writeFile } from "fs/promises";

function concat(...args: string[]) {
  return args.join("");
}

function getOrEmpty(value: string) {
  return Math.random() > 0.5 ? ` ${value}` : "";
}

function createFakePost() {
  const numberOfImages = faker.number.int({ min: 0, max: 4 });
  const images = [];
  const videos = [];

  for (let i = 0; i < numberOfImages; i++) {
    images.push(createFakeImage());
  }

  return {
    content: createFakePostContent(),
    imageUrls: images,
    videoUrls: videos,
  };
}

function createFakePostContent() {
  const url = faker.internet.url();
  const spotifyUrl = "https://open.spotify.com/playlist/2yXGnMiT1jqddwbAWSSLWc";
  const youtubeUrl = "https://www.youtube.com/watch?v=2X_2IdybTV0";

  const urls = [url, spotifyUrl, youtubeUrl];
  const randomUrl = faker.helpers.arrayElement(urls);
  const content = faker.lorem.words(5);
  const tags = [
    "#vevericka",
    "#squirrel",
    "#supernatural",
    "#spongebob",
    "#eurovision",
    "#thumbelina",
    "#adele",
    "#harrypotter",
    "#lordoftherings",
    "#starwars",
    "#gameofthrones",
  ];
  const randomTag = faker.helpers.arrayElement(tags);
  return concat(content, getOrEmpty(randomTag), getOrEmpty(randomUrl));
}

function createFakeImage() {
  return faker.image.urlLoremFlickr({ category: 'animals', width: 1080, height: 720 });
}

function createFakePosts(num: number) {
  const posts = [];

  for (let i = 0; i < num; i++) {
    posts.push(createFakePost());
  }

  return posts;
}

async function main() {
  const posts = createFakePosts(200);
  console.log(posts);
  await writeFile("posts.json", JSON.stringify(posts, null, 2));
}

main();
