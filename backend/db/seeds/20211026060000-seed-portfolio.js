import https from 'https'
import fs from 'fs'
import path from 'path'
import mkdirp from 'mkdirp'
import sharp from 'sharp'
import moment from 'moment'
import { download, imageUploadDir, pdfUploadDir, genId, FISH_JPG, TREE_JPG, BOOK_JPG, APPLES_JPG, RUNNING_JPG, PURPLE_THING_JPG, BOOK_COVER_JPG, SAMPLE_PDF, genThumbnail } from "./20180415220000-seed-demo"

export function up (queryInterface, Sequelize) {
    return Promise.all([
      download(FISH_JPG, '5864ff80-2d22-4fb6-a1d5-d2c537f4317a', 'jpg'),
      download(TREE_JPG, 'c7091aea-9d34-49ad-a7cd-311fd93dce83', 'jpg'),
      download(BOOK_JPG, 'e25d9093-d3da-4b2c-ae39-17520114d8d1', 'jpg'),
      download(APPLES_JPG, 'db98604f-9a2f-4339-907c-a1901dcfe058', 'jpg'),
      download(RUNNING_JPG, '4f566242-d504-491e-bab7-509f3ceea5e6', 'jpg'),
      download(PURPLE_THING_JPG, '8ab1c0b4-3733-49be-8d2e-a364f19165f6', 'jpg'),
      download(BOOK_COVER_JPG, '2f8e972e-1bae-41a2-b90b-fd4532f2268a', 'jpg'),
      download(SAMPLE_PDF, '1a5a1357-44bb-4d6e-9d5b-9c727be776fa', 'pdf')
    ])
    .then (ids => {
      // add all the images
      const now = moment()
      const fishImageId = genId()
      const treeImageId = genId()
      const bookImageId = genId()
      const applesImageId = genId()
      const runningImageId = genId()
      const purpleThingImageId = genId()
      return queryInterface.bulkInsert('images', [
        {
          id: fishImageId,
          path: '5/8/5864ff80-2d22-4fb6-a1d5-d2c537f4317a.jpg',
          horizDimInch: 20,
          vertDimInch: 11,
          mediaType: 'Chromogenic Print',
          createdAt: now.format('YYYY-MM-DD HH:mm:ss'),
          updatedAt: now.format('YYYY-MM-DD HH:mm:ss')
        },
        {
          id: treeImageId,
          path: 'c/7/c7091aea-9d34-49ad-a7cd-311fd93dce83.jpg',
          horizDimInch: 10,
          vertDimInch: 8,
          mediaType: 'Chromogenic Print',
          createdAt: now.format('YYYY-MM-DD HH:mm:ss'),
          updatedAt: now.format('YYYY-MM-DD HH:mm:ss')
        },
        {
          id: bookImageId,
          path: 'e/2/e25d9093-d3da-4b2c-ae39-17520114d8d1.jpg',
          horizDimInch: 20,
          vertDimInch: 31,
          mediaType: 'Inkjet Print',
          createdAt: now.format('YYYY-MM-DD HH:mm:ss'),
          updatedAt: now.format('YYYY-MM-DD HH:mm:ss')
        },
        {
          id: applesImageId,
          path: 'd/b/db98604f-9a2f-4339-907c-a1901dcfe058.jpg',
          horizDimInch: 8.5,
          vertDimInch: 11,
          mediaType: 'Chromogenic Print',
          createdAt: now.format('YYYY-MM-DD HH:mm:ss'),
          updatedAt: now.format('YYYY-MM-DD HH:mm:ss')
        },
        {
          id: runningImageId,
          path: '4/f/4f566242-d504-491e-bab7-509f3ceea5e6.jpg',
          horizDimInch: 21,
          vertDimInch: 24,
          mediaType: 'Inkjet Print',
          createdAt: now.format('YYYY-MM-DD HH:mm:ss'),
          updatedAt: now.format('YYYY-MM-DD HH:mm:ss')
        },
        {
          id: purpleThingImageId,
          path: '8/a/8ab1c0b4-3733-49be-8d2e-a364f19165f6.jpg',
          horizDimInch: 21,
          vertDimInch: 25,
          mediaType: 'Chromogenic Print',
          createdAt: now.format('YYYY-MM-DD HH:mm:ss'),
          updatedAt: now.format('YYYY-MM-DD HH:mm:ss')
        }
      ]).then(() => ({
        ...ids,
        fishImageId,
        treeImageId,
        bookImageId,
        applesImageId,
        runningImageId,
        purpleThingImageId
      }))
    })
    .then (() => {
      queryInterface.bulkInsert('portfolios', [
        {
          title: 'User6 Portfolio',
          studentUsername: 'user6',
          numberOfEntries: 10
        },
        {
          title: 'User7 Portfolio',
          studentUsername: 'user7',
          numberOfEntries: 7
        }
      ])
    })
  }
  
  export function down (queryInterface) {
    return queryInterface.bulkDelete('portfolios', null)
  }

  /*return queryInterface.bulkInsert('portfolios', [
      {
        title: 'My Portfolio',
        studentUsername: 'user6',
        entries: 'Kent'
      },
      {
        username: 'user2',
        firstName: 'Jane',
        lastName: 'Doe',
        type: 'JUDGE'
      },
      {
        username: 'user3',
        firstName: 'Mark',
        lastName: 'Brown',
        type: 'JUDGE'
      },
      {
        username: 'user4',
        firstName: 'Sally',
        lastName: 'Smith',
        type: 'JUDGE'
      },
      {
        username: 'user5',
        firstName: 'Bob',
        lastName: 'Ross',
        type: 'JUDGE'
      },
      {
        username: 'user6',
        firstName: 'Uma',
        lastName: 'Thurman',
        type: 'STUDENT'
      },
      {
        username: 'user7',
        firstName: 'Fred',
        lastName: 'Rogers',
        type: 'STUDENT'
      },
      {
        username: 'user8',
        firstName: 'Roberta',
        lastName: 'Jenkins',
        type: 'STUDENT'
      }
    ]).catch((error) => {
      console.log(error)
    })*/