"""Encode silent, half-speed forward/reverse ambient loops from retained masters."""
from pathlib import Path
import subprocess
import sys

ROOT = Path(__file__).resolve().parents[1]

def encode(name):
    source = ROOT / 'films' / 'masters' / f'{name}.mp4'
    base = ['ffmpeg', '-hide_banner', '-loglevel', 'error', '-y', '-i', str(source)]
    subprocess.run(base + ['-frames:v', '1', '-q:v', '3', str(ROOT / 'films' / f'{name}.jpg')], check=True)
    # Half-speed is deliberate: barely moving landscapes, not time-lapse skies.
    graph = '[0:v]scale=720:1280,setpts=2*(PTS-STARTPTS),fps=24,split[f][r];[r]reverse[rev];[f][rev]concat=n=2:v=1:a=0[v]'
    for ext, codec in [('mp4', ['-c:v','libx264','-crf','27','-maxrate','1600k','-bufsize','3200k','-preset','fast','-pix_fmt','yuv420p','-movflags','+faststart']),
                       ('webm', ['-c:v','libvpx-vp9','-crf','36','-b:v','1200k','-maxrate','1600k','-bufsize','3200k','-cpu-used','4','-row-mt','1'])]:
        target = ROOT / 'films' / f'{name}-loop.{ext}'
        subprocess.run(base + ['-filter_complex', graph, '-map', '[v]', '-an'] + codec + [str(target)], check=True)
        subprocess.run(['ffmpeg','-v','error','-i',str(target),'-f','null','-'], check=True)
        print(target.name, target.stat().st_size, flush=True)

if __name__ == '__main__':
    for name in sys.argv[1:]:
        encode(name)
