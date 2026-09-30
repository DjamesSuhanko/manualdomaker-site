"""Convert MuseScore --score-media output into cursor timing for its SVG.
Usage: python scripts/score_timing.py /path/to/media.json
MuseScore positionswriter.cpp exports image-space coordinates multiplied by 12.
"""
import base64,json,sys,xml.etree.ElementTree as ET
from pathlib import Path
root=Path(__file__).resolve().parents[1]
data=json.loads(Path(sys.argv[1]).read_text())
svg=ET.fromstring(base64.b64decode(data['svgs'][0]))
_,_,width,height=map(float,svg.attrib['viewBox'].split())
def read(key):
    xml=ET.fromstring(base64.b64decode(data[key]))
    elements={e.attrib['id']:e.attrib for e in xml.findall('elements/element')}
    return [(float(e.attrib['position'])/1000,elements[e.attrib['elid']]) for e in xml.findall('events/event')]
measures=read('mposXML');events=[]
for time,e in read('sposXML'):
    assert e['page']=='0','Multi-page scores need a page-aware viewer'
    x,y,w,h=[float(e[k])/12 for k in ('x','y','sx','sy')]
    assert 0<=x<width and 0<=y<height
    measure=max(i+1 for i,(start,_) in enumerate(measures) if start<=time)
    events.append(dict(time=time,x=x/width*100,y=y/height*100,width=w/width*100,height=h/height*100,measure=measure))
assert events and all(a['time']<=b['time'] for a,b in zip(events,events[1:]))
result=dict(duration=data['metadata']['duration'],events=events)
(root/'assets/music/107-msa-bb/timing.json').write_text(json.dumps(result,separators=(',',':')))
print(f'{len(events)} cursor events, {len(measures)} measures, {result["duration"]} seconds')
