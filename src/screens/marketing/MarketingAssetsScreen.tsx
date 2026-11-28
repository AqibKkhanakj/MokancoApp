
import { useMemo, useState } from 'react';
import {
  Alert,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';

import {
  ArrowRight,
  Download,
  FileImage,
  FileText,
  Folder,
  Home,
  Image,
  MoreVertical,
  Search,
  SlidersHorizontal,
  Video,
  X,
} from 'lucide-react-native';

import { FooterMenu } from '../../components/FooterMenu';
import { Screen } from '../../components/Screen';
import { WorkspaceHeader } from '../../components/WorkspaceHeader';
import { colors } from '../../theme/palette';

type AssetType = 'Post card' | 'Banners' | 'Logo' | 'Video' | 'Other';

type MarketingAsset = {
  id: string;
  name: string;
  type: AssetType;
  visibility: 'General' | 'Specific To You';
};

type MarketingFolder = {
  id: string;
  name: string;
  files: number;
};

const folders: MarketingFolder[] = [
  {
    id: '1',
    name: 'Brand Assets',
    files: 2,
  },
  {
    id: '2',
    name: 'Social Media',
    files: 1,
  },
  {
    id: '3',
    name: 'Campaigns',
    files: 1,
  },
];

const assets: MarketingAsset[] = [
  {
    id: '1',
    name: 'Social Media Post Card',
    type: 'Post card',
    visibility: 'General',
  },
  {
    id: '2',
    name: 'Promotional Banner',
    type: 'Banners',
    visibility: 'General',
  },
  {
    id: '3',
    name: 'Moka & Co Logo',
    type: 'Logo',
    visibility: 'General',
  },
  {
    id: '4',
    name: 'Marketing Video',
    type: 'Video',
    visibility: 'Specific To You',
  },
];

const visibilityOptions = [
  'All Visibility',
  'General Only',
  'Specific To You',
];

const typeOptions = [
  'All Types',
  'Post card',
  'Banners',
  'Logo',
  'Video',
  'Other',
];

export function MarketingAssetsScreen() {
  const [search, setSearch] = useState('');
  const [visibility, setVisibility] = useState('All Visibility');
  const [assetType, setAssetType] = useState('All Types');
  const [activeFilter, setActiveFilter] = useState<
    'visibility' | 'type' | null
  >(null);
  const [activeMenu, setActiveMenu] = useState<string | null>(null);

  const filteredAssets = useMemo(() => {
    return assets.filter((asset) => {
      const matchesSearch = asset.name
        .toLowerCase()
        .includes(search.toLowerCase());

      const matchesVisibility =
        visibility === 'All Visibility' ||
        (visibility === 'General Only' &&
          asset.visibility === 'General') ||
        (visibility === 'Specific To You' &&
          asset.visibility === 'Specific To You');

      const matchesType =
        assetType === 'All Types' || asset.type === assetType;

      return matchesSearch && matchesVisibility && matchesType;
    });
  }, [search, visibility, assetType]);

  const filteredFolders = useMemo(() => {
    if (search.trim().length === 0 && assetType === 'All Types') {
      return folders;
    }

    return folders.filter((folder) =>
      folder.name.toLowerCase().includes(search.toLowerCase()),
    );
  }, [search, assetType]);

  const handleAssetAction = (
    action: string,
    asset: MarketingAsset,
  ) => {
    setActiveMenu(null);

    Alert.alert(
      action,
      `${asset.name}\n\nConnect your marketing assets API to enable this action.`,
    );
  };

  const getAssetIcon = (type: AssetType) => {
    switch (type) {
      case 'Video':
        return Video;
      case 'Logo':
        return Image;
      case 'Post card':
        return FileImage;
      case 'Banners':
        return Image;
      default:
        return FileText;
    }
  };

  const renderFilterOptions = (
    options: string[],
    selected: string,
    onSelect: (value: string) => void,
  ) => (
    <View style={styles.filterOptions}>
      {options.map((option) => (
        <Pressable
          key={option}
          onPress={() => {
            onSelect(option);
            setActiveFilter(null);
          }}
          className="px-3 py-3"
        >
          <Text
            className={`text-sm ${
              selected === option
                ? 'font-semibold text-gold'
                : 'text-ink'
            }`}
          >
            {option}
          </Text>
        </Pressable>
      ))}
    </View>
  );

  return (
    <Screen>
      <View className="flex-1">
        <WorkspaceHeader />
        <ScrollView
          className="flex-1"
          contentContainerStyle={styles.content}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        >
          {/* Page Heading */}
          <View>
            <Text className="text-2xl font-semibold text-ink">
              Marketing Assets
            </Text>

            <Text className="mt-1 text-sm leading-5 text-line">
              View and download available marketing assets.
            </Text>
          </View>

          {/* Home Breadcrumb */}
          <Pressable
            className="mt-5 flex-row items-center self-start gap-2"
            onPress={() => {
              // Navigate to Home if needed.
            }}
          >
            <Home color={colors.ink} size={17} strokeWidth={1.8} />

            <Text className="text-sm font-semibold text-ink">
              Home
            </Text>
          </Pressable>

          {/* Search and Filters */}
          <View
            className="mt-5 rounded-2xl bg-surface p-3"
            style={styles.searchCard}
          >
            {/* Search */}
            <View className="h-12 flex-row items-center rounded-xl border border-canvas px-3">
              <Search color={colors.line} size={19} />

              <TextInput
                value={search}
                onChangeText={setSearch}
                placeholder="Search marketing assets..."
                placeholderTextColor="#929BAA"
                className="ml-2 flex-1 text-sm text-ink"
                returnKeyType="search"
              />

              {search.length > 0 && (
                <Pressable onPress={() => setSearch('')}>
                  <X color={colors.line} size={18} />
                </Pressable>
              )}
            </View>

            {/* Visibility Filter */}
            <View className="mt-3">
              <Pressable
                onPress={() =>
                  setActiveFilter(
                    activeFilter === 'visibility' ? null : 'visibility',
                  )
                }
                className="h-11 flex-row items-center justify-between rounded-xl border border-canvas px-3"
              >
                <View className="flex-row items-center gap-2">
                  <SlidersHorizontal color={colors.ink} size={17} />

                  <Text className="text-sm font-medium text-ink">
                    {visibility}
                  </Text>
                </View>

                <Text className="text-xs text-line">
                  {activeFilter === 'visibility' ? '▲' : '▼'}
                </Text>
              </Pressable>

              {activeFilter === 'visibility' &&
                renderFilterOptions(
                  visibilityOptions,
                  visibility,
                  setVisibility,
                )}
            </View>

            {/* Asset Type Filter */}
            <View className="mt-3">
              <Pressable
                onPress={() =>
                  setActiveFilter(
                    activeFilter === 'type' ? null : 'type',
                  )
                }
                className="h-11 flex-row items-center justify-between rounded-xl border border-canvas px-3"
              >
                <View className="flex-row items-center gap-2">
                  <Image color={colors.ink} size={17} />

                  <Text className="text-sm font-medium text-ink">
                    {assetType}
                  </Text>
                </View>

                <Text className="text-xs text-line">
                  {activeFilter === 'type' ? '▲' : '▼'}
                </Text>
              </Pressable>

              {activeFilter === 'type' &&
                renderFilterOptions(
                  typeOptions,
                  assetType,
                  setAssetType,
                )}
            </View>

            {/* Count */}
            <Text className="mt-3 text-xs text-line">
              {filteredFolders.length} folders · {filteredAssets.length} files
            </Text>
          </View>

          {/* Folders */}
          {filteredFolders.length > 0 && (
            <>
              <View className="mb-3 mt-6 flex-row items-center justify-between">
                <Text className="text-base font-semibold text-ink">
                  Folders
                </Text>

                <Text className="text-xs text-line">
                  {filteredFolders.length} folders
                </Text>
              </View>

              <View className="gap-3">
                {filteredFolders.map((folder) => (
                  <Pressable
                    key={folder.id}
                    onPress={() =>
                      Alert.alert(
                        folder.name,
                        'Connect your folder navigation to open its contents.',
                      )
                    }
                    style={styles.folderCard}
                  >
                    <View className="h-11 w-11 items-center justify-center rounded-xl bg-canvas">
                      <Folder
                        color={colors.gold}
                        size={22}
                        strokeWidth={1.8}
                      />
                    </View>

                    <View className="ml-3 flex-1">
                      <Text className="text-sm font-semibold text-ink">
                        {folder.name}
                      </Text>

                      <Text className="mt-1 text-xs text-line">
                        {folder.files} files
                      </Text>
                    </View>

                    <ArrowRight
                      color={colors.line}
                      size={18}
                    />
                  </Pressable>
                ))}
              </View>
            </>
          )}

          {/* Marketing Assets */}
          <View className="mb-3 mt-6 flex-row items-center justify-between">
            <Text className="text-base font-semibold text-ink">
              Marketing assets
            </Text>

            <Text className="text-xs text-line">
              {filteredAssets.length} files
            </Text>
          </View>

          <View className="gap-3">
            {filteredAssets.map((asset) => {
              const AssetIcon = getAssetIcon(asset.type);

              return (
                <View
                  key={asset.id}
                  style={styles.assetCard}
                >
                  {/* Asset Header */}
                  <View className="flex-row items-center justify-between px-3 py-3">
                    <View className="flex-1 flex-row items-center gap-2">
                      <AssetIcon
                        color={
                          asset.type === 'Video'
                            ? colors.gold
                            : colors.line
                        }
                        size={19}
                        strokeWidth={1.8}
                      />

                      <Text
                        numberOfLines={1}
                        className="flex-1 text-sm font-semibold text-ink"
                      >
                        {asset.name}
                      </Text>
                    </View>

                    <Pressable
                      hitSlop={10}
                      onPress={() =>
                        setActiveMenu(
                          activeMenu === asset.id ? null : asset.id,
                        )
                      }
                    >
                      <MoreVertical
                        color={colors.line}
                        size={20}
                      />
                    </Pressable>
                  </View>

                  {/* Asset Preview */}
                  <View className="px-3 pb-3">
                    <View style={styles.assetPreview}>
                      <View style={styles.assetCategoryBadge}>
                        <Text style={styles.assetCategoryText}>
                          {asset.visibility}
                        </Text>
                      </View>

                      <AssetIcon
                        color={
                          asset.type === 'Video'
                            ? colors.gold
                            : '#F87171'
                        }
                        size={48}
                        strokeWidth={1.5}
                      />

                      <Text style={styles.assetTypeLabel}>
                        {asset.type.toUpperCase()}
                      </Text>
                    </View>

                    {/* Asset Actions */}
                    <View className="mt-3 flex-row items-center gap-5">
                      <Pressable
                        onPress={() =>
                          handleAssetAction('Preview', asset)
                        }
                        className="flex-row items-center gap-1"
                      >
                        <Image color={colors.ink} size={16} />

                        <Text className="text-xs font-semibold text-ink">
                          View
                        </Text>
                      </Pressable>

                      <Pressable
                        onPress={() =>
                          handleAssetAction('Download', asset)
                        }
                        className="flex-row items-center gap-1"
                      >
                        <Download color={colors.gold} size={16} />

                        <Text className="text-xs font-semibold text-gold">
                          Download
                        </Text>
                      </Pressable>
                    </View>
                  </View>

                  {/* More Menu */}
                  {activeMenu === asset.id && (
                    <View style={styles.moreMenu}>
                      <Pressable
                        onPress={() =>
                          handleAssetAction('Preview', asset)
                        }
                        className="flex-row items-center gap-2 px-3 py-3"
                      >
                        <Image color={colors.ink} size={16} />

                        <Text className="text-sm text-ink">
                          View asset
                        </Text>
                      </Pressable>

                      <Pressable
                        onPress={() =>
                          handleAssetAction('Download', asset)
                        }
                        className="flex-row items-center gap-2 px-3 py-3"
                      >
                        <Download color={colors.ink} size={16} />

                        <Text className="text-sm text-ink">
                          Download
                        </Text>
                      </Pressable>
                    </View>
                  )}
                </View>
              );
            })}
          </View>

          {/* Empty State */}
          {filteredAssets.length === 0 &&
            filteredFolders.length === 0 && (
              <View className="mt-5 items-center rounded-2xl bg-surface px-5 py-10">
                <FileText color={colors.line} size={38} />

                <Text className="mt-3 text-base font-semibold text-ink">
                  No marketing assets found
                </Text>

                <Text className="mt-1 text-center text-sm text-line">
                  Try changing your search or filters.
                </Text>
              </View>
            )}
        </ScrollView>

        {/* Footer Navigation */}
        <FooterMenu current="Marketing" />
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  content: {
    paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: 24,
  },

  searchCard: {
    borderWidth: 1,
    borderColor: '#EAE8E2',
    shadowColor: colors.ink,
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.04,
    shadowRadius: 8,
    elevation: 2,
  },

  filterOptions: {
    marginTop: 5,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: '#EAE8E2',
    borderRadius: 12,
    overflow: 'hidden',
  },

  folderCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.surface,
    padding: 14,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#EAE8E2',
    shadowColor: colors.ink,
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.04,
    shadowRadius: 8,
    elevation: 2,
  },

  assetCard: {
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: '#EAE8E2',
    borderRadius: 17,
    shadowColor: colors.ink,
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
    overflow: 'visible',
  },

  assetPreview: {
    height: 155,
    backgroundColor: '#F0F4F8',
    borderRadius: 11,
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
  },

  assetCategoryBadge: {
    position: 'absolute',
    top: 10,
    left: 10,
    paddingHorizontal: 10,
    paddingVertical: 5,
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#EAE8E2',
  },

  assetCategoryText: {
    fontSize: 10,
    fontWeight: '500',
    color: '#475569',
  },

  assetTypeLabel: {
    marginTop: 8,
    fontSize: 10,
    fontWeight: '600',
    letterSpacing: 1,
    color: colors.line,
  },

  moreMenu: {
    position: 'absolute',
    top: 45,
    right: 12,
    width: 165,
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#EAE8E2',
    zIndex: 10,
    elevation: 8,
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.12,
    shadowRadius: 8,
  },
});
