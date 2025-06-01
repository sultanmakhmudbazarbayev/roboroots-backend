const ffmpeg = require('fluent-ffmpeg');

const inputPath = 'public/videos/robotics_5.mp4';
const outputPath = 'public/videos/robotics_5_compressed.mp4';

// Set the desired CRF value (quality factor). Lower = better quality, higher = smaller file size.
const crfValue = 28;

// Optionally, set a new resolution
const newWidth = 1280;
const newHeight = 720;

ffmpeg(inputPath)
  // Optionally, resize the video
  .videoFilters(`scale=${newWidth}:${newHeight}`)
  // Set the codec and CRF for compression
  .videoCodec('libx264')
  .outputOptions([`-crf ${crfValue}`])
  .on('start', (commandLine) => {
    console.log('Spawned FFmpeg with command:', commandLine);
  })
  .on('progress', (progress) => {
    console.log('Processing: ' + progress.percent + '% done');
  })
  .on('error', (err, stdout, stderr) => {
    console.error('An error occurred: ' + err.message);
    console.error('ffmpeg stderr:', stderr);
  })
  .on('end', () => {
    console.log('Video compression completed successfully');
  })
  .save(outputPath);
