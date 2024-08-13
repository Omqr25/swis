<?php

namespace App\Http\Controllers\Api\Admin;

use App\Http\Controllers\Controller;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use League\Flysystem\UnableToRetrieveMetadata;

class FileController extends Controller
{
    public function index()
    {
        // Get all files in the storage/public/exports directory
        $files = Storage::disk('public')->allFiles('exports');

        // Organize the file paths or add more details
        $fileList = array_map(function ($file) {
            try {
                return [
                    'path' => $file,
                    'name' => basename($file),
                    'size' => $this->formatSize(Storage::disk('public')->size($file)),
                    'last_modified' => Carbon::createFromTimestamp(Storage::disk('public')->lastModified($file))->format('Y-m-d H:i:s'),
                ];
            } catch (UnableToRetrieveMetadata $e) {
                // Handle the error gracefully
                return [
                    'path' => $file,
                    'name' => basename($file),
                    'size' => 'Unable to retrieve',
                    'last_modified' => 'Unable to retrieve',
                    'error' => $e->getMessage(),
                ];
            }
        }, $files);

        // Return the list of files as a JSON response
        return response()->json($fileList);
    }

    /**
     * Format file size to human-readable format.
     *
     * @param int $bytes
     * @return string
     */
    private function formatSize(int $bytes)
    {
        $units = ['B', 'KB', 'MB', 'GB', 'TB'];
        $factor = floor((strlen($bytes) - 1) / 3);

        return sprintf("%.2f", $bytes / pow(1024, $factor)) . ' ' . $units[$factor];
    }
}
