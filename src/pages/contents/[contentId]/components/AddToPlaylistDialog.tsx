import { useState, useEffect } from 'react';
import {
  Dialog,
  DialogContent,
  DialogClose,
} from '@/components/ui/dialog';
import { toast } from 'sonner';
import { getPlaylists, createPlaylist, addContentToPlaylist } from '@/lib/api/playlists';
import usePlaylistStore from '@/lib/stores/usePlaylistStore';
import { useAuthStore } from '@/lib/stores/useAuthStore';
import type { PlaylistDto, PlaylistCreateRequest } from '@/lib/types';
import icX from '@/assets/ic_X.svg';
import icArrowLeft from '@/assets/ic_arrow_left.svg';

interface AddToPlaylistDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  contentId: string;
}

export default function AddToPlaylistDialog({
  open,
  onOpenChange,
  contentId,
}: AddToPlaylistDialogProps) {
  const [view, setView] = useState<'list' | 'create'>('list');
  const [userPlaylists, setUserPlaylists] = useState<PlaylistDto[]>([]);
  const [selectedPlaylistIds, setSelectedPlaylistIds] = useState<Set<string>>(new Set());
  const [loading, setLoading] = useState(false);
  const [loadingMore, setLoadingMore] = useState(false);
  const [adding, setAdding] = useState(false);
  const [hasNext, setHasNext] = useState(false);
  const [nextCursor, setNextCursor] = useState<string | undefined>();
  const [nextIdAfter, setNextIdAfter] = useState<string | undefined>();
  const { data: jwt } = useAuthStore();

  useEffect(() => {
    if (open && jwt?.userDto.id) {
      fetchUserPlaylists();
    } else {
      setView('list');
      setUserPlaylists([]);
      setSelectedPlaylistIds(new Set());
      setHasNext(false);
      setNextCursor(undefined);
      setNextIdAfter(undefined);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open, jwt?.userDto.id]);

  const fetchUserPlaylists = async () => {
    if (!jwt?.userDto.id) return;

    setLoading(true);
    try {
      const response = await getPlaylists({
        ownerIdEqual: jwt.userDto.id,
        limit: 20,
        sortDirection: 'DESCENDING',
        sortBy: 'updatedAt',
      });

      const notAddedPlaylists = response.data.filter((playlist) => {
        const hasContent = playlist.contents.some((content) => content.id === contentId);
        return !hasContent;
      });

      setUserPlaylists(notAddedPlaylists);
      setSelectedPlaylistIds(new Set());
      setHasNext(response.hasNext || false);
      setNextCursor(response.nextCursor);
      setNextIdAfter(response.nextIdAfter);
    } catch (err) {
      console.error('Failed to fetch playlists:', err);
      toast.error('플레이리스트를 불러오는데 실패했습니다.');
    } finally {
      setLoading(false);
    }
  };

  const fetchMorePlaylists = async () => {
    if (!jwt?.userDto.id || !hasNext || loadingMore) return;

    setLoadingMore(true);
    try {
      const response = await getPlaylists({
        ownerIdEqual: jwt.userDto.id,
        limit: 20,
        sortDirection: 'DESCENDING',
        sortBy: 'updatedAt',
        cursor: nextCursor,
        idAfter: nextIdAfter,
      });

      const notAddedPlaylists = response.data.filter((playlist) => {
        const hasContent = playlist.contents.some((content) => content.id === contentId);
        return !hasContent;
      });

      setUserPlaylists((prev) => [...prev, ...notAddedPlaylists]);
      setHasNext(response.hasNext || false);
      setNextCursor(response.nextCursor);
      setNextIdAfter(response.nextIdAfter);
    } catch (err) {
      console.error('Failed to fetch more playlists:', err);
      toast.error('플레이리스트를 불러오는데 실패했습니다.');
    } finally {
      setLoadingMore(false);
    }
  };

  const handleCheckboxChange = (playlistId: string, isChecked: boolean) => {
    setSelectedPlaylistIds((prev) => {
      const newSet = new Set(prev);
      if (isChecked) {
        newSet.add(playlistId);
      } else {
        newSet.delete(playlistId);
      }
      return newSet;
    });
  };

  const handleAddToPlaylists = async () => {
    setAdding(true);
    try {
      await Promise.all(
        Array.from(selectedPlaylistIds).map((playlistId) =>
          addContentToPlaylist(playlistId, contentId)
        )
      );

      toast.success('플레이리스트에 추가되었습니다.');
      onOpenChange(false);
    } catch (err) {
      console.error('Failed to add content to playlists:', err);
      toast.error('플레이리스트 추가에 실패했습니다.');
    } finally {
      setAdding(false);
    }
  };

  const handleCreatePlaylist = async (data: PlaylistCreateRequest) => {
    try {
      const newPlaylist = await createPlaylist(data);
      usePlaylistStore.getState().add(newPlaylist);
      await addContentToPlaylist(newPlaylist.id, contentId);

      toast.success('플레이리스트가 생성되고 콘텐츠가 추가되었습니다.');
      onOpenChange(false);
    } catch (err) {
      console.error('Failed to create playlist:', err);
      toast.error('플레이리스트 생성에 실패했습니다.');
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        hideCloseButton
        className="max-w-[500px] max-h-[646px] bg-gray-800/50 backdrop-blur-[25px] border border-gray-800 rounded-3xl p-9 flex flex-col"
      >
        {view === 'list' ? (
          <PlaylistListView
            userPlaylists={userPlaylists}
            selectedPlaylistIds={selectedPlaylistIds}
            loading={loading}
            loadingMore={loadingMore}
            adding={adding}
            hasNext={hasNext}
            onCheckboxChange={handleCheckboxChange}
            onAddToPlaylists={handleAddToPlaylists}
            onCreateNew={() => setView('create')}
            onLoadMore={fetchMorePlaylists}
            onClose={() => onOpenChange(false)}
          />
        ) : (
          <CreatePlaylistView
            onBack={() => setView('list')}
            onCreate={handleCreatePlaylist}
          />
        )}
      </DialogContent>
    </Dialog>
  );
}

interface PlaylistListViewProps {
  userPlaylists: PlaylistDto[];
  selectedPlaylistIds: Set<string>;
  loading: boolean;
  loadingMore: boolean;
  adding: boolean;
  hasNext: boolean;
  onCheckboxChange: (playlistId: string, isChecked: boolean) => void;
  onAddToPlaylists: () => void;
  onCreateNew: () => void;
  onLoadMore: () => void;
  onClose: () => void;
}

function PlaylistListView({
  userPlaylists,
  selectedPlaylistIds,
  loading,
  loadingMore,
  adding,
  hasNext,
  onCheckboxChange,
  onAddToPlaylists,
  onCreateNew,
  onLoadMore,
  onClose,
}: PlaylistListViewProps) {
  return (
    <>
      <div className="flex items-center justify-between pb-6 flex-shrink-0">
        <h2 className="text-title1-sb text-gray-300">플레이리스트 추가</h2>
        <DialogClose asChild>
          <button className="w-6 h-6" onClick={onClose}>
            <img src={icX} alt="닫기" className="w-full h-full" />
          </button>
        </DialogClose>
      </div>

      <div className="flex-1 overflow-y-auto mb-5 min-h-0">
        {loading ? (
          <div className="flex items-center justify-center h-full">
            <p className="text-body2-m text-gray-400">로딩 중...</p>
          </div>
        ) : userPlaylists.length === 0 ? (
          <div className="flex items-center justify-center h-full">
            <p className="text-body2-m text-gray-400">콘텐츠를 추가할 플레이리스트가 없습니다.</p>
          </div>
        ) : (
          <div className="space-y-3">
            {userPlaylists.map((playlist) => (
              <PlaylistCheckboxItem
                key={playlist.id}
                playlist={playlist}
                checked={selectedPlaylistIds.has(playlist.id)}
                onChange={(isChecked) => onCheckboxChange(playlist.id, isChecked)}
              />
            ))}
            {hasNext && (
              <button
                onClick={onLoadMore}
                disabled={loadingMore}
                className="w-full py-3 text-body2-m text-gray-400 hover:text-gray-300 transition-colors disabled:opacity-50"
              >
                {loadingMore ? '로딩 중...' : '더 보기'}
              </button>
            )}
          </div>
        )}
      </div>

      <div className="flex gap-4 flex-shrink-0">
        <button
          onClick={onCreateNew}
          className="flex-1 h-[54px] bg-gray-700 rounded-xl px-5 py-3 hover:bg-gray-600 transition-colors"
        >
          <span className="text-body2-sb text-gray-50">+ 새 플레이리스트</span>
        </button>

        <button
          onClick={onAddToPlaylists}
          disabled={adding || selectedPlaylistIds.size === 0}
          className="flex-1 h-[54px] bg-pink-600 rounded-xl px-5 py-3 hover:bg-pink-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <span className="text-body1-b text-white">
            {adding ? '추가 중...' : '추가'}
          </span>
        </button>
      </div>
    </>
  );
}

interface PlaylistCheckboxItemProps {
  playlist: PlaylistDto;
  checked: boolean;
  onChange: (checked: boolean) => void;
}

function PlaylistCheckboxItem({ playlist, checked, onChange }: PlaylistCheckboxItemProps) {
  return (
    <label className="flex items-center gap-2 py-2.5 px-1 cursor-pointer">
      <input
        type="checkbox"
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
        className="w-5 h-5 rounded border-2 border-gray-600 bg-transparent checked:bg-pink-600 checked:border-pink-600 cursor-pointer appearance-none flex items-center justify-center after:content-['✓'] after:text-white after:text-sm after:hidden checked:after:block"
      />
      <div className="flex-1">
        <p className="text-body2-sb text-gray-100">{playlist.title}</p>
      </div>
    </label>
  );
}

interface CreatePlaylistViewProps {
  onBack: () => void;
  onCreate: (data: PlaylistCreateRequest) => Promise<void>;
}

function CreatePlaylistView({ onBack, onCreate }: CreatePlaylistViewProps) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [creating, setCreating] = useState(false);

  const handleSubmit = async () => {
    if (!title.trim() || !description.trim()) {
      toast.error('제목과 설명을 모두 입력해주세요.');
      return;
    }

    setCreating(true);
    try {
      await onCreate({ title: title.trim(), description: description.trim() });
    } finally {
      setCreating(false);
    }
  };

  return (
    <div className="flex flex-col gap-5">
      <div className="flex items-center gap-2 py-2">
        <button onClick={onBack} className="w-5 h-5">
          <img src={icArrowLeft} alt="뒤로가기" className="w-full h-full" />
        </button>
        <h2 className="text-title1-sb text-gray-300">새 플레이리스트</h2>
      </div>

      <div className="flex flex-col gap-2.5">
        <label className="text-body3-sb text-gray-300 px-1">제목</label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="제목을 입력해주세요"
          className="h-[54px] w-full bg-gray-800/50 border-[1.5px] border-gray-800 rounded-xl px-5 py-3.5 text-body2-m-140 text-gray-50 placeholder:text-gray-400 focus:outline-none focus:border-pink-600"
        />
      </div>

      <div className="flex flex-col gap-2.5">
        <label className="text-body3-sb text-gray-300 px-1">설명</label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="설명을 입력해주세요"
          className="h-[120px] w-full bg-gray-800/50 border-[1.5px] border-gray-800 rounded-xl px-5 py-4 text-body2-m-140 text-gray-50 placeholder:text-gray-400 focus:outline-none focus:border-pink-600 resize-none"
        />
      </div>

      <div className="flex gap-4 pt-1.5">
        <button
          onClick={onBack}
          disabled={creating}
          className="flex-1 h-[54px] bg-gray-700 rounded-xl text-body1-b text-gray-50 hover:bg-gray-600 transition-colors disabled:opacity-50"
        >
          취소
        </button>
        <button
          onClick={handleSubmit}
          disabled={creating || !title.trim() || !description.trim()}
          className="flex-1 h-[54px] bg-pink-600 rounded-xl text-body1-b text-white hover:bg-pink-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {creating ? '생성 중...' : '생성'}
        </button>
      </div>
    </div>
  );
}
