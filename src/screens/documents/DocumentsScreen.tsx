
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
  Download,
  Eye,
  FileImage,
  FileText,
  Home,
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

type DocumentItem = {
  id: string;
  name: string;
  category: string;
  type: 'image' | 'video' | 'pdf';
};

const documents: DocumentItem[] = [
  {
    id: '1',
    name: 'mermaid-diagram-2026-07',
    category: 'General',
    type: 'image',
  },
  {
    id: '2',
    name: 'thumb',
    category: 'General',
    type: 'video',
  },
  {
    id: '3',
    name: 'EIC_NEWSLETTER_DECEMBER',
    category: 'General',
    type: 'pdf',
  },
  {
    id: '4',
    name: 'Website Performance Comparison',
    category: 'General',
    type: 'pdf',
  },
];

export function DocumentsScreen() {
  const [search, setSearch] = useState('');
  const [visibility, setVisibility] = useState('All Visibility');
  const [showVisibility, setShowVisibility] = useState(false);
  const [activeMenu, setActiveMenu] = useState<string | null>(null);

  const filteredDocuments = useMemo(() => {
    return documents.filter((document) => {
      const matchesSearch = document.name
        .toLowerCase()
        .includes(search.toLowerCase());

      const matchesVisibility =
        visibility === 'All Visibility' ||
        document.category === visibility;

      return matchesSearch && matchesVisibility;
    });
  }, [search, visibility]);

  const handleDocumentAction = (action: string, document: DocumentItem) => {
    setActiveMenu(null);

    Alert.alert(
      action,
      `${document.name}\n\nConnect your document API to enable this action.`,
    );
  };

  const renderPreview = (type: DocumentItem['type']) => {
    if (type === 'image') {
      return (
        <View style={styles.imagePreview}>
          <FileImage color={colors.ink} size={42} strokeWidth={1.5} />
          <Text style={styles.previewLabel}>IMAGE</Text>
        </View>
      );
    }

    if (type === 'video') {
      return (
        <View style={styles.videoPreview}>
          <Video color={colors.ink} size={42} strokeWidth={1.5} />
          <Text style={styles.previewLabel}>VIDEO</Text>
        </View>
      );
    }

    return (
      <View style={styles.pdfPreview}>
        <FileText color="#F87171" size={48} strokeWidth={1.7} />
        <Text style={styles.pdfLabel}>PDF DOCUMENT</Text>
      </View>
    );
  };

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
              Documents
            </Text>

            <Text className="mt-1 text-sm leading-5 text-line">
              View and download available documents.
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

          {/* Search and Visibility */}
          <View className="mt-5 rounded-2xl bg-surface p-3" style={styles.searchCard}>
            <View className="h-12 flex-row items-center rounded-xl border border-canvas px-3">
              <Search color={colors.line} size={19} />

              <TextInput
                value={search}
                onChangeText={setSearch}
                placeholder="Search all files..."
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
                onPress={() => setShowVisibility(!showVisibility)}
                className="h-11 flex-row items-center justify-between rounded-xl border border-canvas px-3"
              >
                <View className="flex-row items-center gap-2">
                  <SlidersHorizontal
                    color={colors.ink}
                    size={17}
                  />

                  <Text className="text-sm font-medium text-ink">
                    {visibility}
                  </Text>
                </View>

                <Text className="text-xs text-line">
                  {showVisibility ? '▲' : '▼'}
                </Text>
              </Pressable>

              {showVisibility && (
                <View style={styles.filterOptions}>
                  {['All Visibility', 'General'].map((option) => (
                    <Pressable
                      key={option}
                      onPress={() => {
                        setVisibility(option);
                        setShowVisibility(false);
                      }}
                      className="px-3 py-3"
                    >
                      <Text
                        className={`text-sm ${
                          visibility === option
                            ? 'font-semibold text-gold'
                            : 'text-ink'
                        }`}
                      >
                        {option}
                      </Text>
                    </Pressable>
                  ))}
                </View>
              )}
            </View>

            {/* Document Count */}
            <Text className="mt-3 text-xs text-line">
              0 folders · {filteredDocuments.length} files
            </Text>
          </View>

          {/* Document List Heading */}
          <View className="mb-3 mt-6 flex-row items-center justify-between">
            <Text className="text-base font-semibold text-ink">
              Available documents
            </Text>

            <Text className="text-xs text-line">
              {filteredDocuments.length} files
            </Text>
          </View>

          {/* Document Cards */}
          <View className="gap-3">
            {filteredDocuments.map((document) => (
              <View
                key={document.id}
                style={styles.documentCard}
              >
                {/* Document Header */}
                <View className="flex-row items-center justify-between px-3 py-3">
                  <View className="flex-1 flex-row items-center gap-2">
                    {document.type === 'pdf' ? (
                      <FileText
                        color="#F87171"
                        size={19}
                        strokeWidth={1.8}
                      />
                    ) : (
                      <FileImage
                        color={colors.line}
                        size={19}
                        strokeWidth={1.8}
                      />
                    )}

                    <Text
                      numberOfLines={1}
                      className="flex-1 text-sm font-semibold text-ink"
                    >
                      {document.name}
                    </Text>
                  </View>

                  <Pressable
                    hitSlop={10}
                    onPress={() =>
                      setActiveMenu(
                        activeMenu === document.id
                          ? null
                          : document.id,
                      )
                    }
                  >
                    <MoreVertical
                      color={colors.line}
                      size={20}
                    />
                  </Pressable>
                </View>

                {/* Document Preview */}
                <View className="px-3 pb-3">
                  <View style={styles.previewContainer}>
                    {renderPreview(document.type)}

                    <View style={styles.categoryBadge}>
                      <Text style={styles.categoryText}>
                        {document.category}
                      </Text>
                    </View>
                  </View>

                  {/* Document Actions */}
                  <View className="mt-3 flex-row items-center gap-4">
                    <Pressable
                      onPress={() =>
                        handleDocumentAction('Preview', document)
                      }
                      className="flex-row items-center gap-1"
                    >
                      <Eye color={colors.ink} size={16} />

                      <Text className="text-xs font-semibold text-ink">
                        View
                      </Text>
                    </Pressable>

                    <Pressable
                      onPress={() =>
                        handleDocumentAction('Download', document)
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
                {activeMenu === document.id && (
                  <View style={styles.moreMenu}>
                    <Pressable
                      onPress={() =>
                        handleDocumentAction('Preview', document)
                      }
                      className="flex-row items-center gap-2 px-3 py-3"
                    >
                      <Eye color={colors.ink} size={16} />
                      <Text className="text-sm text-ink">View document</Text>
                    </Pressable>

                    <Pressable
                      onPress={() =>
                        handleDocumentAction('Download', document)
                      }
                      className="flex-row items-center gap-2 px-3 py-3"
                    >
                      <Download color={colors.ink} size={16} />
                      <Text className="text-sm text-ink">Download</Text>
                    </Pressable>
                  </View>
                )}
              </View>
            ))}
          </View>

          {/* Empty State */}
          {filteredDocuments.length === 0 && (
            <View className="mt-5 items-center rounded-2xl bg-surface px-5 py-10">
              <FileText color={colors.line} size={38} />

              <Text className="mt-3 text-base font-semibold text-ink">
                No documents found
              </Text>

              <Text className="mt-1 text-center text-sm text-line">
                Try searching with a different file name.
              </Text>
            </View>
          )}
        </ScrollView>

        {/* Footer Navigation */}
        <FooterMenu current="Documents" />
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
  },

  documentCard: {
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

  previewContainer: {
    height: 155,
    backgroundColor: '#F0F4F8',
    borderRadius: 11,
    overflow: 'hidden',
    alignItems: 'center',
    justifyContent: 'center',
  },

  imagePreview: {
    flex: 1,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#E8EDF4',
  },

  videoPreview: {
    flex: 1,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#E8E1D5',
  },

  pdfPreview: {
    flex: 1,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },

  previewLabel: {
    marginTop: 7,
    fontSize: 10,
    fontWeight: '600',
    letterSpacing: 1,
    color: colors.line,
  },

  pdfLabel: {
    marginTop: 7,
    fontSize: 10,
    fontWeight: '600',
    letterSpacing: 1,
    color: colors.line,
  },

  categoryBadge: {
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

  categoryText: {
    fontSize: 10,
    fontWeight: '500',
    color: '#475569',
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
