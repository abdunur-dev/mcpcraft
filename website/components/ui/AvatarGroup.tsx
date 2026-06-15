interface AvatarGroupMember {
  username: string;
}

interface AvatarGroupProps {
  members: AvatarGroupMember[];
  size?: number;
  limit?: number;
  className?: string;
}

function initials(name: string): string {
  return name.slice(0, 2).toUpperCase();
}

function avatarColor(name: string): string {
  const colors = [
    "bg-emerald-600", "bg-blue-600", "bg-purple-600",
    "bg-amber-600", "bg-rose-600", "bg-cyan-600",
    "bg-indigo-600", "bg-pink-600",
  ];
  let hash = 0;
  for (let i = 0; i < name.length; i++) {
    hash = name.charCodeAt(i) + ((hash << 5) - hash);
  }
  return colors[Math.abs(hash) % colors.length];
}

export function AvatarGroup({ members, size = 32, limit, className = "" }: AvatarGroupProps) {
  const displayed = limit ? members.slice(0, limit) : members;
  const overflow = limit ? Math.max(0, members.length - limit) : 0;

  return (
    <div className={`flex items-center ${className}`} style={{ paddingLeft: size * 0.15 }}>
      {displayed.map((member, i) => (
        <div
          key={member.username}
          className={`rounded-full border-2 border-black flex items-center justify-center text-white font-mono font-bold ${avatarColor(member.username)}`}
          style={{
            width: size,
            height: size,
            fontSize: size * 0.35,
            marginLeft: i > 0 ? -size * 0.15 : 0,
            zIndex: displayed.length - i,
          }}
          title={member.username}
        >
          {initials(member.username)}
        </div>
      ))}
      {overflow > 0 && (
        <div
          className="rounded-full border-2 border-black bg-white/10 flex items-center justify-center text-white/60 font-mono"
          style={{
            width: size,
            height: size,
            fontSize: size * 0.3,
            marginLeft: -size * 0.15,
            zIndex: 0,
          }}
          title={`+${overflow} more`}
        >
          +{overflow}
        </div>
      )}
    </div>
  );
}
