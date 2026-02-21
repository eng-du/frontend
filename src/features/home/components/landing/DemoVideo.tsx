interface DemoVideoProps {
  src: string;
}

function DemoVideo({ src }: DemoVideoProps) {
  return (
    <div className="overflow-hidden rounded-2xl shadow-default">
      <video src={src} autoPlay loop muted playsInline className="h-full w-full object-cover" />
    </div>
  );
}

export default DemoVideo;
